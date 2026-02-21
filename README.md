# HMS Data Explorer

A lightweight, basic web application to explore data from the Hospital Management System (HMS) API.

## Features

- Dynamic table generation for any entity (Visits, Patients, Doctors).
- Environment-based configuration using a `.env` file.
- Clean, basic styling for data presentation.
- Zero dependencies (Vanilla HTML, CSS, and JavaScript).

## Setup

1. **Environment Configuration**: Create a `.env` file in the root directory and add your API URL:

   ```env
   API_URL=http://hms-api.us-east-1.elasticbeanstalk.com/
   ```

2. **Open the Application**: Open the `index.html` file in any modern web browser.

## How it Works

- The application attempts to read the `API_URL` from the `.env` file at runtime.
- If the `.env` file is missing or blocked (common when opening via `file://`), it uses a hardcoded fallback URL.
- The JavaScript dynamically detects columns and builds a standard HTML table for any entity fetched.

## Project Structure

- `index.html`: The main user interface.
- `script.js`: Core logic for fetching and rendering data.
- `style.css`: Basic table and layout styling.
- `.env`: Environment variables (API URL).
