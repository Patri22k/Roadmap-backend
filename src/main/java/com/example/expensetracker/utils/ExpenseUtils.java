package com.example.expensetracker.utils;

import com.example.expensetracker.Expense;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ExpenseUtils {
    private ExpenseUtils() {}

    public static List<Expense> readExpensesFromFile(ObjectMapper mapper, File file)
            throws IOException {
        Expense[] expenses = mapper.readValue(file, Expense[].class);
        return new ArrayList<>(Arrays.asList(expenses));
    }
}