package main

import (
	"log"

	"github.com/gosimple/slug"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	app.OnRecordBeforeCreateRequest("posts").Add(func(e *core.RecordCreateEvent) error {

		url := e.Record.GetString("title")

		slugURL := slug.Make(url)

		e.Record.Set("url", slugURL)

		log.Println(url)
		log.Println(slugURL)

		return nil
	})

	app.OnRecordBeforeUpdateRequest("posts").Add(func(e *core.RecordUpdateEvent) error {

		url := e.Record.GetString("title")

		slugURL := slug.Make(url)

		e.Record.Set("url", slugURL)

		log.Println(url)
		log.Println(slugURL)

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
