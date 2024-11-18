package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

type Task struct {
	ID          int       `json:"id"`
	Description string    `json:"description"`
	Status      string    `json:"status"`
	CreateAt    time.Time `json:"time"`
	UpdateAt    time.Time `json:"updateAt"`
}

// TODO:
/*
- optimilize the code
- create more functions
- move functions to new files
- maybe add new features
- change printing some options like `list <done/todo>`
*/

func main() {
	// Save file name with which the whole project will work
	filename := "tasks.json"

	if len(os.Args) < 2 {
		fmt.Println("Please write a valid command. For help write 'help'")
		os.Exit(1)
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
		writeNewTasks(filename, tasks)

		// Print the updated task
		fmt.Printf("Task added: %v\n", task)

	} else if os.Args[1] == "update" && len(os.Args) == 4 {

		// UPDATE
		// Read the file
		tasks := readTasks(filename)

		// Convert the ID from terminal to int
		idFromTerminal, err := strconv.Atoi(os.Args[2])
		if err != nil {
			fmt.Println("Error converting id from terminal to int: ", err)
			os.Exit(1)
		}

		// Check if the ID exists in the file
		var notId bool = false
		for index := range tasks {
			if tasks[index].ID == idFromTerminal {
				tasks[index].Description = os.Args[3]
				notId = true
			}
		}

		// Check if the id in the file exists
		if !notId {
			fmt.Printf("ID %d doesn't exist in the file %s\n", idFromTerminal, filename)
			os.Exit(1)
		}

		// Marshal it back to the JSON file
		data, err := json.Marshal(tasks)
		if err != nil {
			fmt.Println("Error marshaling the file ", err)
			os.Exit(1)
		}

		err = os.WriteFile(filename, data, 0644)
		if err != nil {
			fmt.Println("Error writing to the file ", err)
			os.Exit(1)
		}

		// Print the updated tasks
		printTasks(tasks)

	} else if os.Args[1] == "delete" && len(os.Args) == 3 {

		// DELETE

		// Save the id of the task to be deleted
		taskToBeDeletedIdString := os.Args[2]
		taskToBeDeletedId, err := strconv.Atoi(taskToBeDeletedIdString)
		if err != nil {
			fmt.Println("Conversion error, for more information write `help`")
			os.Exit(1)
		}

		// Remove the task and save it
		updatedFile := deleteTask(filename, taskToBeDeletedId)

		// Update the IDs (first ID = 1)
		updatedFile = repairID(updatedFile)

		// Write it back to the json
		writeNewTasks(filename, updatedFile)

		// Print the updated tasks
		printTasks(updatedFile)

	} else if os.Args[1] == "mark-in-progress" && len(os.Args) == 3 {

		// MARK IN-PROGRESS
		// Read the file
		tasks := readTasks(filename)

		// Convert input ID from terminal to int
		taskId, err := strconv.Atoi(os.Args[2])
		if err != nil {
			fmt.Println("Error converting input ID to int: ", err)
			os.Exit(1)
		}

		// Change the status by id and if the id doesn't exist, terminate
		var taskIdNotExist bool = false
		for index := range tasks {
			if tasks[index].ID == taskId {
				tasks[index].Status = "in-progress"
				taskIdNotExist = true
			}
		}

		if !taskIdNotExist {
			fmt.Printf("The given ID %d doesn't exist in the file %s\n", taskId, filename)
			os.Exit(1)
		}

		// Write updated task back to JSON
		data, err := json.Marshal(tasks)
		if err != nil {
			fmt.Println("Error marshaling the file: ", err)
			os.Exit(1)
		}

		err = os.WriteFile(filename, data, 0644)
		if err != nil {
			fmt.Println("Error writing to the file: ", err)
			os.Exit(1)
		}

		// Print the updated tasks
		printTasks(tasks)

	} else if os.Args[1] == "mark-done" && len(os.Args) == 3 {

		// MARK DONE
		// Read the file
		tasks := readTasks(filename)

		// Convert input ID from terminal to int
		taskId, err := strconv.Atoi(os.Args[2])
		if err != nil {
			fmt.Println("Error converting input ID to int: ", err)
			os.Exit(1)
		}

		// Change the status by id and if the id doesn't exist, terminate
		var taskIdNotExist bool = false
		for index := range tasks {
			if tasks[index].ID == taskId {
				tasks[index].Status = "done"
				taskIdNotExist = true
			}
		}

		if !taskIdNotExist {
			fmt.Printf("The given ID %d doesn't exist in the file %s\n", taskId, filename)
			os.Exit(1)
		}

		// Write updated task back to JSON
		data, err := json.Marshal(tasks)
		if err != nil {
			fmt.Println("Error marshaling the file: ", err)
			os.Exit(1)
		}

		err = os.WriteFile(filename, data, 0644)
		if err != nil {
			fmt.Println("Error writing to the file: ", err)
			os.Exit(1)
		}

		// Print the updated tasks
		printTasks(tasks)

	} else if os.Args[1] == "list" && len(os.Args) == 2 {

		// LIST ALL TASKS

		// Save all tasks from file to a variable
		readTask := readTasks(filename)

		// Print the updated tasks
		printTasks(readTask)

	} else if os.Args[1] == "list" && os.Args[2] == "done" {

		// LIST DONE
		// Read the file
		tasks := readTasks(filename)

		// Iterate through the file and find only status = "Done"
		var atLeastOneDoneStatus bool = false
		for index, elem := range tasks {
			if tasks[index].Status == "done" {
				fmt.Printf("ID: %-5d, Description: %-20s, Status: %-15s, Created at: %-12s\n", elem.ID, elem.Description, elem.Status, elem.CreateAt.String())
				atLeastOneDoneStatus = true
			}
		}

		// Check if at least one status was true
		if !atLeastOneDoneStatus {
			fmt.Println("No task is marked 'Done'")
		}
		return

	} else if os.Args[1] == "list" && os.Args[2] == "todo" {

		// TODO LIST
		// Read the file
		tasks := readTasks(filename)

		// Iterate through the file and find only status = "Done"
		var atLeastOneDoneStatus bool = false
		for index, elem := range tasks {
			if tasks[index].Status == "pending" {
				fmt.Printf("ID: %d, Description: %s, Status: %s, Created at: %s\n", elem.ID, elem.Description, elem.Status, elem.CreateAt.String())
				atLeastOneDoneStatus = true
			}
		}

		// Check if at least one status was true
		if !atLeastOneDoneStatus {
			fmt.Println("No task is marked 'Pending'")
		}
		return

	} else if os.Args[1] == "list" && os.Args[2] == "in-progress" {

		// LIST IN-PROGRESS
		// Read the file
		tasks := readTasks(filename)

		// Iterate through the file and find only status = "Done"
		var atLeastOneDoneStatus bool = false
		for index, elem := range tasks {
			if tasks[index].Status == "in-progress" {
				fmt.Printf("ID: %d, Description: %s, Status: %s, Created at: %s\n", elem.ID, elem.Description, elem.Status, elem.CreateAt.String())
				atLeastOneDoneStatus = true
			}
		}

		// Check if at least one status was true
		if !atLeastOneDoneStatus {
			fmt.Println("No task is marked 'Done'")
		}
		return

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
	tasks := readTasks(filename)

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

// Function writeNewTasks add taskToBeAdded to the filename
func writeNewTasks(filename string, taskToBeAdded []Task) {
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

// Function for printing the header and the updated file of tasks
func printTasks(tasks []Task) {
	// Print table header
	fmt.Printf("\n%-5s %-20s %-15s %-12s\n", "ID", "Description", "Status", "Created at")
	fmt.Println(strings.Repeat("-", 100))

	// Print the updated tasks
	for _, elem := range tasks {
		fmt.Printf("%-5d %-20s %-15s %-12s\n", elem.ID, elem.Description, elem.Status, elem.CreateAt)
	}

	// Add new line at the end
	fmt.Println()
}

func deleteTask(filename string, taskToBEDeletedId int) []Task {
	tasks := readTasks(filename)

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
