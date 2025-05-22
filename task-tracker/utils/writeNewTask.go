package utils

import (
	"encoding/json"
	"fmt"
	"os"
	"task-cli/models"
)

// WriteNewTasks add taskToBeAdded
// to the filename at the end of the file.
func WriteNewTasks(filename string, taskToBeAdded []models.Task) {
	data, err := json.MarshalIndent(taskToBeAdded, "", " ")
	if err != nil {
		fmt.Println("Error marshaling the tasks: ", err)
		os.Exit(1)
	}

	err = os.WriteFile(filename, data, 0644)
	if err != nil {
		fmt.Println("Error writing to the file: ", err)
		os.Exit(1)
	}
}
