package main

import (
	"bytes"
	"os/exec"
	"strings"
	"task-cli/utils/tests"
	"testing"
)

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
