package routs

import (
	"net/http"
	"text/template"
)

func Lab1(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("templates/first.html")
	tmpl.Execute(w, nil)
}
