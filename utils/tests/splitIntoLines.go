package tests

import "strings"

// SplitIntoLines splits a string into lines
func SplitIntoLines(s string) []string {
	return strings.Split(s, "\n")
}
