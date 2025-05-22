package tests

import "os"

func GetTaskFilePath() string {
	if taskFile := os.Getenv("TASK_FILE"); taskFile != "" {
		return taskFile
	}
	return "tasks.json"
}
