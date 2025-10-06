package routs

import (
	"fmt"
	"net/http"
	"text/template"
)

func Welcome(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("templates/welcome.html")
	tmpl.Execute(w, nil)
	fmt.Println("yes")
}
