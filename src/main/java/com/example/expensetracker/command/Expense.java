package com.example.expensetracker.command;

public class Expense {
    private String id;
    private String date;
    private String description;
    private String amount;

    public Expense() {}

    public Expense(String id, String date, String description, String amount) {
        this.id = id;
        this.date = date;
        this.description = description;
        this.amount = amount;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setAmount(String amount) { this.amount = amount; }

    public String getId() {
        return id;
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