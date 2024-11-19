package utils

import (
	"awesomeProject/models"
	"encoding/json"
	"fmt"
	"os"
)

// Function remove task from the json file.
// If the task doesn't exist, it will print an error.
func DeleteTask(filename string, taskToBEDeletedId int) []models.Task {
	tasks := ReadTasks(filename)

	// Remove the task based on the given ID
	var updatedTasks []models.Task
	var idDontExist bool = false
	for _, element := range tasks {
		if taskToBEDeletedId == element.ID {
			idDontExist = true
			continue
		}

		updatedTasks = append(updatedTasks, element)
	}

	// If the ID doesn't exist
	if !idDontExist {
		fmt.Println("The ID you want to delete doesn't exist")
		os.Exit(1)
	}

	// Marshal the updated task back to JSON
	updatedData, err := json.Marshal(updatedTasks)
	if err != nil {
		fmt.Println("Error marshaling the file: ", err)
		os.Exit(1)
	}

	// Write the updated data back to the file
	err = os.WriteFile(filename, updatedData, 0644)
	if err != nil {
		fmt.Println("Error writing to the file: ", err)
		os.Exit(1)
	}

	return updatedTasks
}
