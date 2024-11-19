package utils

import (
	"encoding/json"
	"fmt"
	"os"
	"task-cli/models"
)

// Function will read the content of the file `filename`
// and save it to variable `tasks`
func ReadTasks(filename string) []models.Task {
	data, err := os.ReadFile(filename)
	if err != nil {
		// Check if the file doesn't exist
		if os.IsNotExist(err) {
			return []models.Task{}
		}
		fmt.Println("Error reading the file: ", err)
		os.Exit(1)
	}

	// Unmarshaling the file
	var tasks []models.Task
	err = json.Unmarshal(data, &tasks)
	if err != nil {
		fmt.Println("Error unmarshaling the file", err)
		os.Exit(1)
	}

	return tasks
}
