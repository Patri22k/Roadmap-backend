package main

import (
	"awesomeProject/models"
	"awesomeProject/utils"
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

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
		tasks := utils.ReadTasks(filename)

		// Create a new task
		task := models.Task{
			ID:          utils.GenerateID(),
			Description: os.Args[2],
			Status:      "pending",
			CreateAt:    time.Now(),
			UpdateAt:    time.Now(),
		}

		// Add new task to the list
		tasks = append(tasks, task)

		// Save the updated tasks list
		utils.WriteNewTasks(filename, tasks)

		// Print the updated task
		fmt.Printf("Task added: %v\n", task)

	} else if os.Args[1] == "update" && len(os.Args) == 4 {

		// UPDATE
		// Read the file
		tasks := utils.ReadTasks(filename)

		// Convert the ID from terminal to int
		idFromTerminal, err := strconv.Atoi(os.Args[2])
		if err != nil {
			fmt.Println("Error converting id from terminal to int: ", err)
			os.Exit(1)
		}

		// Check if the ID exists in the file and update Description
		var notId bool = false
		for index := range tasks {
			if tasks[index].ID == idFromTerminal {
				tasks[index].Description = os.Args[3]
				tasks[index].UpdateAt = time.Now()
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
		utils.PrintTasks(tasks)

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
		updatedFile := utils.DeleteTask(filename, taskToBeDeletedId)

		// Update the IDs (first ID = 1)
		updatedFile = utils.RepairID(updatedFile)

		// Write it back to the json
		utils.WriteNewTasks(filename, updatedFile)

		// Print the updated tasks
		utils.PrintTasks(updatedFile)

	} else if os.Args[1] == "mark-in-progress" && len(os.Args) == 3 {

		// MARK IN-PROGRESS
		// Read the file
		tasks := utils.ReadTasks(filename)

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
				tasks[index].UpdateAt = time.Now()
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
		utils.PrintTasks(tasks)

	} else if os.Args[1] == "mark-done" && len(os.Args) == 3 {

		// MARK DONE
		// Read the file
		tasks := utils.ReadTasks(filename)

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
				tasks[index].UpdateAt = time.Now()
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
		utils.PrintTasks(tasks)

	} else if os.Args[1] == "list" && len(os.Args) == 2 {

		// LIST ALL TASKS

		// Save all tasks from file to a variable
		readTask := utils.ReadTasks(filename)

		// Print the updated tasks
		utils.PrintTasks(readTask)

	} else if os.Args[1] == "list" && os.Args[2] == "done" {

		// LIST DONE
		// Read the file
		tasks := utils.ReadTasks(filename)

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
		tasks := utils.ReadTasks(filename)

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
		tasks := utils.ReadTasks(filename)

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
		fmt.Printf("\n%-30s %s\n", "Commands", "Explanation")
		fmt.Println(strings.Repeat("-", 130))
		fmt.Printf("%-30s %s\n", "add <description>", "Adding new task to json file, <description> has to be inside quotation marks when space is needed")
		fmt.Printf("%-30s %s\n", "update <id> <description>", "Update existing task saved in json file, if <id> doesn't exist, it'll print an error")
		fmt.Printf("%-30s %s\n", "delete <id>", "Delete existing task saved in json file, if <id> doesn't exist, it'll print an error")
		fmt.Printf("%-30s %s\n", "mark-in-progress <id>", "Change the status of task from `pending` or `done` to `in-progress`")
		fmt.Printf("%-30s %s\n", "mark-done <id>", "Change the status of task from `pending` or `in-progress` to `done`")
		fmt.Printf("%-30s %s\n", "list", "Print all tasks saved in json file")
		fmt.Printf("%-30s %s\n", "list done", "Print all tasks with status `done` from json file")
		fmt.Printf("%-30s %s\n", "list todo", "Print all tasks with status `pending` from json file")
		fmt.Printf("%-30s %s\n \n", "list in-progress", "Print all tasks with status `in-progress` from json file")

	} else {

		// ERROR
		fmt.Println("Please write a valid command. For help write 'help'")
		return
	}
}
