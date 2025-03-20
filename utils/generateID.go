package utils

import "os"

// GenerateID creates new ID for new task that was created by the user.
// If the file doesn't exist, it will start counting from 1
func GenerateID() int {
	filename := "tasks.json"

	// Check if the file exists
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		// If the file does not exist, start the ID from 1
		return 1
	}

	// Read the file
	tasks := ReadTasks(filename)

	// Find the highest ID
	highestID := 0
	for _, task := range tasks {
		if task.ID > highestID {
			highestID = task.ID
		}
	}

	// Return the highest ID + 1
	return highestID + 1
}
