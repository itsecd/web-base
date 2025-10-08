package routs

import (
	"net/http"
	"text/template"
)

func Lab4(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("templates/calculator.html")
	tmpl.Execute(w, nil)
}
