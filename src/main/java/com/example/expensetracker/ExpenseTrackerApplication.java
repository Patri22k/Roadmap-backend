package com.example.expensetracker;

import com.example.expensetracker.command.Expense;
import com.example.expensetracker.command.PrintHelp;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class ExpenseTrackerApplication {

    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("No arguments provided. Type --help or -h for help.");
            return;
        }

        String command = args[0];
        PrintHelp help = new PrintHelp();

        switch (command) {
            case "--help":
            case "-h":
                help.print();
                break;
            case "add":
                if (args.length != 5) {
                    help.print();
                    return;
                }
                Expense addExpense = new Expense("1", LocalDate.now().toString(), args[2], args[4]);
                ObjectMapper mapper = new ObjectMapper();

                File jsonFile = new File("expenses.json");

                try {
                    if (jsonFile.exists() && jsonFile.length() > 0) {
                        // Read the existing JSON file
                        Expense[] existingExpenses = mapper.readValue(jsonFile, Expense[].class);

                        // Converts the array to more flexible List interface with ArrayList as the implementation
                        List<Expense> updatedExpenses = new ArrayList<>(Arrays.asList(existingExpenses));

                        // Set the ID for the new expense
                        String correctID = String.valueOf(updatedExpenses.toArray().length + 1);
                        addExpense.setId(correctID);

                        // Add the new expense to the list
                        updatedExpenses.add(addExpense);

                        // Write the updated list back to the JSON file
                        mapper.writeValue(jsonFile, updatedExpenses);
                    } else {
                        // Create a new JSON file and write the expense to it
                        Expense[] newExpense = new Expense[]{addExpense};
                        mapper.writeValue(jsonFile, newExpense);
                    }

                    System.out.println("# Expense added successfully (ID: " + addExpense.getId() + ")");
                } catch (Exception e) {
                    System.out.println("Error converting to JSON: " + e.getMessage());
                }
                break;
            case "delete":
                if (args.length != 3 || !args[1].contains("--id")) {
                    help.print();
                    return;
                }
                String deleteID = args[2];

                // Read the existing JSON file
                try {
                    ObjectMapper mapperDelete = new ObjectMapper();
                    File deleteFromFile = new File("expenses.json");

                    if (deleteFromFile.exists() && deleteFromFile.length() > 0) {
                        // Read the existing JSON file
                        Expense[] existingExpenses = mapperDelete.readValue(deleteFromFile, Expense[].class);

                        // Convert the array to a List for easier manipulation
                        List<Expense> updatedExpenses = new ArrayList<>(Arrays.asList(existingExpenses));

                        // Error handling: if ID doesn't exist
                        boolean existID = updatedExpenses.stream()
                                        .anyMatch(expense -> expense.getId().equals(deleteID));
                        if (!existID) {
                            System.out.println("Expense with ID: " + deleteID + " not found");
                            return;
                        }

                        // Find and remove the expense with the specified ID
                        updatedExpenses.stream().filter(expense -> expense.getId().equals(deleteID))
                                .findFirst()
                                .ifPresent(updatedExpenses::remove);

                        // Reset the IDs after deletion
                        for (int i = 0; i < updatedExpenses.size(); i++) {
                            updatedExpenses.get(i).setId(String.valueOf(i + 1));
                        }

                        // Write back to the JSON file
                        mapperDelete.writeValue(deleteFromFile, updatedExpenses);
                    }

                    System.out.println("# Expense deleted successfully");
                } catch (Exception e) {
                    System.out.println("Error with JSON file: " + e.getMessage());
                }

                break;
            case "list":
                if (args.length != 1) {
                    help.print();
                    return;
                }

                ObjectMapper mapperList = new ObjectMapper();

                File listFile = new File("expenses.json");

                try {
                    if (listFile.exists() && listFile.length() > 0) {
                        // Read expenses from JSON file
                        Expense[] expenses = mapperList.readValue(listFile, Expense[].class);

                        List<Expense> convertedExpenses = new ArrayList<>(Arrays.asList(expenses));

                        // Print the output
                        System.out.printf("# %-4s %-15s %-15s %-6s%n", "ID", "Date", "Description", "Amount");
                        convertedExpenses.forEach(expense ->
                                System.out.printf("# %-4s %-15s %-15s %-6s \n", expense.getId(), expense.getDate(), expense.getDescription(), expense.getAmount() + "€")
                        );
                    } else {
                        System.out.println("No expenses found");
                        return;
                    }

                } catch (Exception e) {
                    System.out.println("Error with JSON file: " + e.getMessage());
                }
                break;
            case "summary":
                ObjectMapper mapperSummary = new ObjectMapper();

                File summaryFile = new File("expenses.json");

                // List of month names in English
                List<String> monthNames = Arrays.asList(
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                );

                try {
                    if (summaryFile.exists() && summaryFile.length() > 0) {
                        // Summary of all expenses
                        if (args.length == 1) {
                            // Read all expenses from JSON file
                            Expense[] allExpenses = mapperSummary.readValue(summaryFile, Expense[].class);
                            List<Expense> convertedExpenses = new ArrayList<>(Arrays.asList(allExpenses));

                            // Iterate and calculate sum
                            int sum = convertedExpenses.
                                    stream().
                                    mapToInt(expense -> Integer.parseInt(expense.getAmount())).
                                    sum();

                            System.out.println("# Total expenses: " + sum + "€");
                        }
                        // Summary of expenses per specific month
                        else if (args.length == 3 && args[1].equals("--month")) {
                           String argMonth = args[2];

                           // Check for correct type (only numbers)
                            String monthRegex = "\\b[0-9]+\\b";
                            if (!argMonth.matches(monthRegex)) {
                                System.out.println("Invalid month format");
                                return;
                            }

                           // Check for correct month
                            if (Integer.parseInt(argMonth) < 0 || Integer.parseInt(argMonth) > 12) {
                                System.out.println("Invalid month");
                                return;
                            }

                           String month = argMonth.length() == 1 ? "0" + argMonth : argMonth;

                           int monthIndex = Integer.parseInt(argMonth) - 1;
                           String monthName = monthNames.get(monthIndex);

                            // Read all expenses from JSON file
                            Expense[] allExpenses = mapperSummary.readValue(summaryFile, Expense[].class);
                            List<Expense> convertedExpenses = new ArrayList<>(Arrays.asList(allExpenses));

                            int monthSum = convertedExpenses.stream()
                                    .filter(expense -> expense.getDate().substring(5, 7).equals(month))
                                    .mapToInt(expense -> Integer.parseInt(expense.getAmount()))
                                    .sum();

                            System.out.println("# Total expenses for " + monthName + ": " + monthSum);
                        }
                        // Summary of expenses per specific year
                        else if (args.length == 3 && args[1].equals("--year")) {
                            String year = args[2];

                            // Check for correct year (only numbers, no negative numbers)
                            String yearRegex = "\\b[0-9]+\\b";
                            if (!year.matches(yearRegex)) {
                                System.out.println("Invalid year format");
                                return;
                            }

                            // Read all expenses from JSON file
                            Expense[] allExpenses = mapperSummary.readValue(summaryFile, Expense[].class);
                            List<Expense> convertedExpenses = new ArrayList<>(Arrays.asList(allExpenses));

                            int yearSum = convertedExpenses.stream()
                                    .filter(expense -> expense.getDate().substring(0,4).equals(year))
                                    .mapToInt(expense -> Integer.parseInt(expense.getAmount()))
                                    .sum();

                            System.out.println("# Total expenses in " + year + ": " + yearSum);
                        }
                        else {
                            help.print();
                        }

                    }
                } catch (Exception e) {
                    System.out.println("Error with JSON file: " + e.getMessage());
                }
                break;
        }
    }

}
