package routs

import (
	"net/http"
	"text/template"
)

func Lab2(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("templates/second.html")
	tmpl.Execute(w, nil)
}
