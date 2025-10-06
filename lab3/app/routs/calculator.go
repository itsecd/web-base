package routs

import (
	"net/http"
	"text/template"
)

func Calculator(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("templates/calculator.html")
	tmpl.Execute(w, nil)
}
