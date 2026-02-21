# HMS Data Explorer

A lightweight, basic web application to explore data from the Hospital Management System (HMS) API.

## Features

- Dynamic table generation for any entity (Visits, Patients, Doctors).
- Clean, basic styling for data presentation.
- Zero dependencies (Vanilla HTML, CSS, and JavaScript).

## Setup

1. **Open the Application**: Open the `index.html` file in any modern web browser.

## How it Works

- Upon clicking a "Fetch" button, it performs an asynchronous GET request to the HMS API with the `Accept: application/json` header.
- The JavaScript dynamically detects the columns from the first record of the response and builds a standard HTML table to display all rows and columns.

## Project Structure

- `index.html`: The main user interface.
- `script.js`: Core logic for fetching and rendering data (basic syntax).
- `style.css`: Basic table and layout styling.
