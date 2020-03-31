# Save Links For Later

Web app to quickly save links to a list for later. [View demo](https://bumbleb2na.github.io/react-save-links).

Add a new hyperlink to a list. When links open in browser they are flagged as visited.

[![To Do App Screenshot](./screenshots/react-save-links-screen1_s.png)](./screenshots/react-save-links-screen1.png)

React app built with Create React App. Uses Material UI.

## Setup

```bash
npm install
npm start
```

## Decisions / Plan

* Is this project for a reusable component or is it for a project such as a Single Page Application (SPA)? 

    *Reusable compo*nent because, we want to use it in other projects.*
* Do we plan to use a state management library like Redux? 

    *No because, this is intended to be a reusable component in other projects.*
* Where should data be stored?

    1. *The links can be sensitive so we should avoid localStorage and use IndexedDb for better security*
	2. *Since this is a reusable component we may want to make this configurable to use either GraphQL or REST Api but, we will assume REST Api for now but build the Api in to a Data Layer which could be adapted later to support either REST Api or GraphQL*
* Should we build components as controlled or uncontrolled?

    *Controlled from the List component because,*
  * *We want to perform List CRUD operations at the List level, which includes updating or deleting list items.*
  * *We want to call a REST Api from the List Level for CRUD operations.*
  * *We want to assume Api will be successful to update UI before Api returns data.*
  * *We're not using a state management library like Redux.*
* Use a front-end UI framework like Material UI? 

    *Material UI because, we want to use Google Material Design.*
* Use a preference towards React component classes or, preference to React hooks with functional classes? 

    *React hooks because,*
  * *Material UI has preference to hooks.*
  * *React team encourages use of hooks for developing new components.*
  * *We want to make child components as reusable as possible.*