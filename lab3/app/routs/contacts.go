package routs

import (
	"net/http"
	"text/template"
)

func Contacts(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("templates/contacts.html")
	tmpl.Execute(w, nil)
}
