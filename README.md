# Task Tracker CLI

This project is a simple Task Tracker CLI application built with Go (Golang). It is designed to help you manage tasks through a command-line interface, ideal for backend-first project tutorials like those found on [roadmap.sh](https://roadmap.sh/projects/task-tracker).  
The application allows you to create, update, and delete tasks, making it a great way to get hands-on experience with Go while learning how to structure backend applications.

## Features
- Add tasks with descriptions.
- Update existing tasks by ID.
- Delete tasks by ID.
- Mark tasks as `in-progress` or `done`.
- List tasks based on their status (`pending`, `done`, `in-progress`).

## Building the Project
To build the project as an executable, run:
```go
go build -o task-cli main.go
```
This will create an executable file named task-cli in the current directory.  

## Running the Project
You can run the project using the executable:
```bash
./task-cli help
```
Example commands:
```bash
./task-cli add "Finish writing README"
./task-cli list
./task-cli mark-done 1
```

## Running Without Building
If you prefer to run the project directly without building an executable, you can use:  
```bash
go run main.go help
```

## Running Tests  
To ensure the application works as expected, you can run the tests:
```bash
go test ./...
```