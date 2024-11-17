package main

import (
	"encoding/json"
	"fmt"
	"os"
)

type Task struct {
	ID          int    // json:"id"
	Description string // json:"description"
	Status      string // json:"status"
	/*createAt
	updateAt    string json:"updateAt"*/
}

func main() {
	// Check if the user has provided any command
	if os.Args[1] == "add" && len(os.Args) == 3 {

		// ADD
		task := Task{
			ID:          generateID(),
			Description: os.Args[2],
			Status:      "pending",
		}

		// Check if the ID was generated correctly
		if task.ID == -1 {
			fmt.Println("Error generating the ID")
			return
		}

		// Marshaling the text to JSON
		taskJSON, err := json.Marshal(task)
		if err != nil {
			fmt.Println("Error marshaling the task")
			return
		}

		// Write the JSON to a file
		filename := "tasks.json"
		err = os.WriteFile(filename, taskJSON, 0644)
		if err != nil {
			fmt.Println("Error writing the task to the file")
			return
		}

		// Test
		fmt.Printf("Task written to the file: %s %s\n", filename, taskJSON)
		return
	} else if os.Args[1] == "update" && len(os.Args) == 4 {

		// UPDATE

	} else if os.Args[1] == "delete" && len(os.Args) == 3 {

		// DELETE

	} else if os.Args[1] == "mark-in-progress" && len(os.Args) == 3 {

		// MARK IN-PROGRESS

	} else if os.Args[1] == "mark-done" && len(os.Args) == 3 {

		// MARK DONE

	} else if os.Args[1] == "list" && len(os.Args) == 2 {

		// LIST ALL TASKS
		data, err := os.ReadFile("tasks.json")
		if err != nil {
			fmt.Println("Error reading the file")
			return
		}

		// Unmarshaling the JSON to a struct
		var readTask Task
		err = json.Unmarshal(data, &readTask)
		if err != nil {
			fmt.Println("Error unmarshaling the task")
			return
		}

		// Test
		fmt.Printf("Task read from the file: %v\n", readTask)

	} else if os.Args[1] == "list" && os.Args[2] == "done" {

		// LIST DONE

	} else if os.Args[1] == "list" && os.Args[2] == "todo" {

		// TODO LIST

	} else if os.Args[1] == "list" && os.Args[2] == "in-progress" {

		// LIST IN-PROGRESS

	} else if os.Args[1] == "help" && len(os.Args) == 2 {

		// HELP
		fmt.Println("Commands:")
		fmt.Println("add <description>")
		fmt.Println("update <id> <description>")
		fmt.Println("delete <id>")
		fmt.Println("mark-in-progress <id>")
		fmt.Println("mark-done <id>")
		fmt.Println("list")
		fmt.Println("list done")
		fmt.Println("list todo")
		fmt.Println("list in-progress")

	} else {

		// ERROR
		fmt.Println("Please write a valid command. For help write 'help'")
		return
	}
}

func generateID() int {
	filename := "tasks.json"

	// Check if the file exists
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		// If the file does not exist, start the ID from 1
		return 1
	}

	// Read the file
	data, err := os.ReadFile(filename)
	if err != nil {
		fmt.Println("Error reading the file", err)
		return -1
	}

	// Unmarshaling the JSON to a struct
	var tasks []Task
	err = json.Unmarshal(data, &tasks)
	if err != nil {
		fmt.Println("Error unmarshaling the tasks", err)
		return -1
	}

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
