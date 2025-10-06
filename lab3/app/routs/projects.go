package routs

import (
	"net/http"
	"text/template"
)

func Projects(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("templates/projects.html")
	tmpl.Execute(w, nil)
}
