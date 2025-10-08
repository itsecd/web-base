package routs

import (
	"net/http"
	"text/template"
)

func About(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("templates/about.html")
	tmpl.Execute(w, nil)
}
