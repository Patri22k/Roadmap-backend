package utils

import (
	"fmt"
	"strings"
	"task-cli/models"
)

// PrintTasks prints a file with new changes commited by the user
func PrintTasks(tasks []models.Task) {
	// Find the longest description
	maxDesLen := 20
	for _, elem := range tasks {
		if len(elem.Description) > maxDesLen {
			maxDesLen = len(elem.Description)
		}
	}

	// Add spacing between description and status
	maxDesLen += 2

	// Create dynamic format string based on the longest description
	formatString1 := fmt.Sprintf("%%-5s %%-%ds %%-15s %%-27s %%s\n", maxDesLen) // for heading, because "ID" is string
	formatString2 := fmt.Sprintf("%%-5d %%-%ds %%-15s %%-27s %%s\n", maxDesLen) // for body, because printing the content of ID, which is int

	// Print table header
	fmt.Printf("\n"+formatString1, "ID", "Description", "Status", "Created at", "Updated at")
	fmt.Println(strings.Repeat("-", 5+1+maxDesLen+3+15+1+27+1+19))

	// Print the updated tasks
	for _, elem := range tasks {
		fmt.Printf(formatString2, elem.ID, elem.Description, elem.Status, elem.CreateAt.Format("15:04:05   02-01-2006"), elem.UpdateAt.Format("15:04:05   02-01-2006"))
	}

	// Add new line at the end
	fmt.Println()
}
