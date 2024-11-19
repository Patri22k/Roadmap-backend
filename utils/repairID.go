package utils

import "awesomeProject/models"

// If task was deleted, this function will update all IDs
// of tasks, so that the first task will always have the ID of 1
func RepairID(tasks []models.Task) []models.Task {
	// Update the ID of all tasks
	for index := range tasks {
		tasks[index].ID = index + 1
	}

	return tasks
}
