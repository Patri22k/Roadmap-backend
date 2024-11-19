package main

import (
	"bytes"
	"encoding/json"
	"os"
	"os/exec"
	"strings"
	"task-cli/models"
	"task-cli/utils"
	"task-cli/utils/tests"
	"testing"
)

func TestDeleteTask(t *testing.T) {
	// Setup: create a temporary file for testing
	tmpFile, err := os.CreateTemp("", "tasks.json")
	if err != nil {
		t.Fatalf("Failed to create a temporary file: %v", err)
	}
	defer os.Remove(tmpFile.Name())

	// Initialize the file with a task
	initialTasks := []models.Task{
		{ID: 1, Description: "Test task to delete"},
	}
	data, _ := json.Marshal(initialTasks)
	if _, err := tmpFile.Write(data); err != nil {
		t.Fatalf("Failed to initialize temporary file with tasks: %v", err)
	}
	tmpFile.Close()

	// Read tasks to confirm initial state
	var previousState []models.Task = utils.ReadTasks(tmpFile.Name())

	// Execute the deletion of task ID 1
	cmd := exec.Command("go", "run", "main.go", "delete", "1")
	cmd.Env = append(os.Environ(), "TASK_FILE="+tmpFile.Name())
	err = cmd.Run()
	if err != nil {
		t.Fatalf("Failed to execute command: %v", err)
	}

	// Read tasks again to confirm final state
	var testState []models.Task = utils.ReadTasks(tmpFile.Name())

	// Testing the length of the task list
	if len(previousState) != len(testState)+1 {
		t.Fatalf("Expected %d tasks after deletion, but got %d", len(previousState)-1, len(testState))
	}

	// Ensure the deleted task is no longer present
	for _, task := range testState {
		if task.ID == 1 {
			t.Fatalf("Task with ID 1 was not deleted")
		}
	}
}

func TestAddTask(t *testing.T) {
	// Setup: create a temporary file for testing
	tmpFile, err := os.CreateTemp("", "tasks.json")
	if err != nil {
		t.Fatalf("Failed to create a temporary file: %v", err)
	}
	defer os.Remove(tmpFile.Name())

	// Initialize the file with an empty JSON array
	if _, err := tmpFile.Write([]byte("[]")); err != nil {
		t.Fatalf("Failed to initialize temporary file with empty JSON: %v", err)
	}
	tmpFile.Close()

	// Save all previous tasks from the temporary file
	var previousState []models.Task = utils.ReadTasks(tmpFile.Name()) // Pass the temp file as env variable

	// Execute the adding of a task
	cmd := exec.Command("go", "run", "main.go", "add", "Successfully added test description")
	cmd.Env = append(os.Environ(), "TASK_FILE="+tmpFile.Name())
	err = cmd.Run()
	if err != nil {
		t.Fatalf("Failed to execute command: %v", err)
	}

	// Again saving the content of the file
	var testState []models.Task = utils.ReadTasks(tmpFile.Name())

	// Testing the length of the files
	if len(previousState) != len(testState)-1 {
		t.Fatalf("Expected %d tasks, but got %d", len(previousState)+1, len(testState))
	}

	// Verify the added task by it's unique description
	taskFound := false
	for _, elem := range testState {
		if elem.Description == "Successfully added test description" {
			taskFound = true
			break
		}
	}
	if !taskFound {
		t.Fatalf("Expected task with desccription `Successfully added test description` not found in tasks")
	}
}

func TestHelp(t *testing.T) {
	// Run the command
	cmd := exec.Command("go", "run", "main.go", "help")
	var out bytes.Buffer
	cmd.Stdout = &out
	cmd.Stdin = &out

	err := cmd.Run()
	if err != nil {
		t.Fatalf("Failed to execute command: %v", err)
	}

	// Define expected output
	expected := []string{
		"Commands                       Explanation",
		"----------------------------------------------------------------------------------------------------------------------------------",
		"add <description>              Adding new task to json file, <description> has to be inside quotation marks when space is needed",
		"update <id> <description>      Update existing task saved in json file, if <id> doesn't exist, it'll print an error",
		"delete <id>                    Delete existing task saved in json file, if <id> doesn't exist, it'll print an error",
		"mark-in-progress <id>          Change the status of task from `pending` or `done` to `in-progress`",
		"mark-done <id>                 Change the status of task from `pending` or `in-progress` to `done`",
		"list                           Print all tasks saved in json file",
		"list done                      Print all tasks with status `done` from json file",
		"list todo                      Print all tasks with status `pending` from json file",
		"list in-progress               Print all tasks with status `in-progress` from json file",
	}

	// Convert the output to a slice of strings by splitting on newlines
	actual := tests.SplitIntoLines(strings.TrimSpace(out.String())) // Trim leading/trailing whitespace/newlines

	// Compare the actual output with the expected output
	if len(actual) != len(expected) {
		t.Fatalf("Expected %d lines, got %d", len(expected), len(actual))
	}

	// Compare each line
	for i, line := range expected {
		if actual[i] != line {
			t.Errorf("Expected line %d to be %q, but got %q", i+1, line, actual[i])
		}
	}
}
