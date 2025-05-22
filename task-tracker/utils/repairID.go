package utils

import "task-cli/models"

// RepairID updates all IDs so task will
// always start from ID 1, if task was deleted.
func RepairID(tasks []models.Task) []models.Task {
	// Update the ID of all tasks
	for index := range tasks {
		tasks[index].ID = index + 1
	}

	return tasks
}
