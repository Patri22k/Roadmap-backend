package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"time"
)

type Task struct {
	ID          int       `json:"id"`
	Description string    `json:"description"`
	Status      string    `json:"status"`
	CreateAt    time.Time `json:"time"`
	UpdateAt    time.Time `json:"updateAt"`
}

func main() {
	filename := "tasks.json"

	if len(os.Args) < 2 {
		fmt.Println("Please write a valid command. For help write 'help'")
		return
	}

	// Check if the user has provided any command
	if os.Args[1] == "add" && len(os.Args) == 3 {

		// Read existing tasks
		tasks := readTasks(filename)

		// Create a new task
		task := Task{
			ID:          generateID(),
			Description: os.Args[2],
			Status:      "pending",
			CreateAt:    time.Now(),
			UpdateAt:    time.Now(),
		}

		// Add new task to the list
		tasks = append(tasks, task)

		// Save the updated tasks list
		writeTasks(filename, tasks)

		// Test
		fmt.Printf("Task added: %v\n", task)
		return

	} else if os.Args[1] == "update" && len(os.Args) == 4 {

		// UPDATE

	} else if os.Args[1] == "delete" && len(os.Args) == 3 {

		// DELETE

		// Save the id of the task to be deleted
		taskToBeDeletedIdString := os.Args[2]
		taskToBeDeletedId, err := strconv.Atoi(taskToBeDeletedIdString)
		if err != nil {
			fmt.Println("Conversion error, for more information write `help`")
			return
		}

		// Remove the task and save it
		updatedFile := deleteTask(filename, taskToBeDeletedId)

		// Update the IDs (first ID = 1)
		updatedFile = repairID(updatedFile)

		// Write it back to the json
		writeTasks(filename, updatedFile)

		// Print the result of the updated file
		fmt.Println("Your updated file is: ")
		for _, updatedTask := range updatedFile {
			fmt.Printf("ID: %d, Description: %s, Status: %s, Created at: %s\n", updatedTask.ID, updatedTask.Description, updatedTask.Status, updatedTask.CreateAt.String())
		}

	} else if os.Args[1] == "mark-in-progress" && len(os.Args) == 3 {

		// MARK IN-PROGRESS

	} else if os.Args[1] == "mark-done" && len(os.Args) == 3 {

		// MARK DONE

	} else if os.Args[1] == "list" && len(os.Args) == 2 {

		// LIST ALL TASKS

		// Save all tasks from file to a variable
		readTask := readTasks(filename)

		// Print all tasks
		fmt.Println("All tasks:")
		for _, elem := range readTask {
			fmt.Printf("ID: %d, Description: %s, Status: %s, Created at: %s\n", elem.ID, elem.Description, elem.Status, elem.CreateAt.String())
		}

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

func repairID(tasks []Task) []Task {
	// Update the ID of all tasks
	for index := range tasks {
		tasks[index].ID = index + 1
	}

	return tasks
}

func readTasks(filename string) []Task {
	data, err := os.ReadFile(filename)
	if err != nil {
		// Check if the file doesn't exist
		if os.IsNotExist(err) {
			return []Task{}
		}
		fmt.Println("Error reading the file: ", err)
		os.Exit(1)
	}

	var tasks []Task
	err = json.Unmarshal(data, &tasks)
	if err != nil {
		fmt.Println("Error unmarshaling the file", err)
		os.Exit(1)
	}

	return tasks
}

// Function writeTasks add taskToBeAdded to the filename
func writeTasks(filename string, taskToBeAdded []Task) {
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

func deleteTask(filename string, taskToBEDeletedId int) []Task {
	data, err := os.ReadFile(filename)
	if err != nil {
		// Check if the file doesn't exist
		if os.IsNotExist(err) {
			return []Task{}
		}
		fmt.Println("Error reading the file: ", err)
		os.Exit(1)
	}

	// Unmarshal the file
	var tasks []Task
	err = json.Unmarshal(data, &tasks)
	if err != nil {
		fmt.Println("Error unmarshaling the file: ", err)
		os.Exit(1)
	}

	// Remove the task based on the given ID
	var updatedTasks []Task
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
