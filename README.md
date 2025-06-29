
# Event Scheduler System

This is a full-stack Event Scheduler web app built using Flask (Python) and a modern HTML/CSS/JavaScript frontend. It allows you to add, view, update, delete, and search events.

---

## How to Run This Project (Windows + VS Code)

### 1. Clone or Download the Project

Place all files in a folder named `event_scheduler_app` with this structure:

```
event_scheduler_app/
├── app.py
├── events.json            # ← create this manually and add: []
├── reminder.py
├── templates/
│   └── index.html
├── static/
│   ├── script.js
│   └── style.css
```

> If `events.json` doesn't exist, create it and paste: `[]`

---

### 2. Open Project in VS Code

- Open VS Code
- Go to **File → Open Folder → Select `event_scheduler_app`**

---

### 3. Create a Virtual Environment (Optional but Recommended)

```bash
python -m venv venv
venv\Scripts\activate
```

---

### 4. Install Flask

```bash
pip install flask
```

---

###  5. Run the App

```bash
python app.py
```

Open your browser and go to:

```
http://127.0.0.1:5000/
```

##  API Endpoints

The following REST API endpoints are available:

| Method | Endpoint           | Description             |
|--------|--------------------|-------------------------|
| GET    | `/events`          | Get all events          |
| POST   | `/events`          | Create a new event      |
| PUT    | `/events/<id>`     | Update an event         |
| DELETE | `/events/<id>`     | Delete an event         |
| GET    | `/search?q=term`   | Search events by query  |

You can use these endpoints directly via Postman or your frontend interface.

---


You’ll see a full UI to "add, view, edit, delete, and search" events.



