# Expense tracker

A simple expense tracker application built with **Spring Boot** and Java, 
using **Maven** as the build tool. This application allows users to easily 
track their expenses, categorize them, and view their spending over time.
The output is stored to JSON file called `expenses.json` in the root of the 
project.

## Features
- add an expense with a description and amount
- delete an expense via ID
- update an expense amount via ID
- view all expenses
- view a summary of all expenses
- view a summary of expenses for a specific month/year

## Build
```bash
./mvnw clean package
cp target/expense-tracker-0.0.1-SNAPSHOT.jar ~/.local/bin/expense-tracker.jar
```

## Run
```bash
expense-tracker [COMMAND] --key "value" [anotherKey "value2" ...]
```

## Output
```bash
expense-tracker add --description "Obed" --amount "12"
# Expense added successfully (ID: 1)

expense-tracker add --description "Desiata" --amount "5"
# Expense added successfully (ID: 2)

expense-tracker list
# ID   Date            Description     Amount
# 1    2025-04-06      Obed            12€    
# 2    2025-04-06      Desiata         5€

expense-tracker summary
# Total expenses: 17€

 expense-tracker update --id 1 --amount 20
# Expense updated successfully

expense-tracker summary --month 4
# Total expenses for April: 25

expense-tracker summary --month 04
# Total expenses for April: 25

expense-tracker delete --id 1
# Expense deleted successfully

expense-tracker summary --year 2025
# Total expenses in 2025: 5
```

## Technologies
- **Java SDK (Version 21)**: Core language for backend development
- **Spring Boot**: Framework for building the application
- **Maven**: Dependency management and build tool

## Environments
- Running on: **WSL (Windows Subsystem for Linux)**
