package utils

import (
	"awesomeProject/models"
	"fmt"
	"strings"
)

// Function for printing the file with new changes commited by the user
func PrintTasks(tasks []models.Task) {
	// Print table header
	fmt.Printf("\n%-5s %-20s %-15s %-27s %s\n", "ID", "Description", "Status", "Created at", "Updated at")
	fmt.Println(strings.Repeat("-", 130))

	// Print the updated tasks
	for _, elem := range tasks {
		fmt.Printf("%-5d %-20s %-15s %-27s %s\n", elem.ID, elem.Description, elem.Status, elem.CreateAt.Format("15:04:05   02-01-2006"), elem.UpdateAt.Format("15:04:05   02-01-2006"))
	}

	// Add new line at the end
	fmt.Println()
}
