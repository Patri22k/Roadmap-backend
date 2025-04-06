package com.example.expensetracker.utils;

import org.springframework.stereotype.Component;

@Component
public class PrintHelp {
    public void print() {
        System.out.println("Usage:");
        System.out.println("expense-tracker [COMMAND] --key \"value\" [anotherKey \"value2\" ...]");
    }
}