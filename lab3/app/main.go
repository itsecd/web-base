package main

import (
	"lab3/routs"
	"net/http"
)

func main() {
	http.HandleFunc("/", routs.Welcome)
	http.HandleFunc("/about", routs.About)
	http.HandleFunc("/contacts", routs.Contacts)
	http.HandleFunc("/projects", routs.Projects)
	http.HandleFunc("/lab1", routs.Lab1)
	http.HandleFunc("/lab2", routs.Lab2)
	http.HandleFunc("/calculator", routs.Calculator)
	http.Handle("/static/",
		http.StripPrefix("/static/",
			http.FileServer(http.Dir("static"))))
	http.ListenAndServe(":8080", nil)
}
