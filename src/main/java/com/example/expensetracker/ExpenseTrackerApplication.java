package com.example.expensetracker;

import com.example.expensetracker.command.AddExpense;
import com.example.expensetracker.command.PrintHelp;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.time.LocalDate;

@SpringBootApplication
public class ExpenseTrackerApplication {

    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("No arguments provided. Type --help or -h for help.");
            return;
        }

        String command = args[0];

        // TODO: Add error handling for invalid commands
        switch (command) {
            case "--help":
            case "-h":
                PrintHelp help = new PrintHelp();
                help.print();
                break;
            case "add":
                // TODO: Implement AddExpense command
                AddExpense addExpense = new AddExpense(LocalDate.now().toString(), args[2], args[4]);
                ObjectMapper mapper = new ObjectMapper();

                File jsonFile = new File("expenses.json");

                try {
                    if (jsonFile.exists()) {
                        // TODO: Implement logic to append to existing JSON file
                        return;
                    } else {
                        // Create a new JSON file and write the expense to it
                        mapper.writeValue(jsonFile, addExpense);
                    }
                } catch (Exception e) {
                    System.out.println("Error converting to JSON: " + e.getMessage());
                }
                break;
            case "delete":
                // TODO: Implement DeleteExpense command
                break;
            case "list":
                // TODO: Implement ListExpenses command
                break;
        }
    }

}
