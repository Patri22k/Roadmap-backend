# Task Tracker CLI

This project is a simple Task Tracker CLI application built with Go (Golang). It is designed to help you manage tasks through a command-line interface, ideal for backend-first project tutorials like those found on [roadmap.sh](https://roadmap.sh/projects/task-tracker).  
The application allows you to create, update, and delete tasks, making it a great way to get hands-on experience with Go while learning how to structure backend applications.

## Features
- **Create a Task:** Add a task with a description based on given ID.
- **List Tasks:** View all the tasks stored in json file.
- **Update Task Description**: Modify the task descriptions.
- **Update Task Status**: Modify the task status.
- **Delete Task:** Remove tasks from the list.
- **Simple Storage:** Tasks are stored in a local file for simplicity.

## Installation
Follow these steps to set up the Task Tracker CLI application:
1.  **Clone the repository:**
```bash
git clone https://github.com/Patri22k/task-tracker
cd task-tracker
```
2. **Install Dependencies:**  
If you haven't already, make sure you have Go installed and properly set up. Run the following command to download necessary dependencies (if any):  
```go
go mod tidy
```
3. **Run the application:  
Once installed, you can start the CLI tool with:  
```go
go run main.go help
```
This will run the application, and you should see all commands and their explanations.

## Usage
Just type `help`,   
it's all there,  
commands and options,  
without a care.
