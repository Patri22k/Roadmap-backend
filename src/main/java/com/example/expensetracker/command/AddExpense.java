package com.example.expensetracker.command;

public class AddExpense {
    private final String date;
    private final String description;
    private final String amount;

    public AddExpense(String date, String description, String amount) {
        this.date = date;
        this.description = description;
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public String getAmount() {
        return amount;
    }

    public String getDate() {
        return date;
    }
}