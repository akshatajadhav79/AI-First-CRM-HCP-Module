# AI-Powered HCP Interaction Logger

An AI-assisted CRM tool for logging healthcare professional (HCP) interactions.
The application allows medical representatives to record meetings, calls, or emails with doctors while using AI to automatically extract structured information from natural language input.

This project combines **React + Redux (Frontend)** with **FastAPI + LangGraph + LLM (Backend)** to provide an intelligent interaction logging system.

---

## 🚀 Features

### 1. AI-Assisted Interaction Logging

Users can describe an interaction in natural language, for example:

> "Met Dr. Sharma today at 3pm to discuss OncoBoost trial results. He was positive and asked for a follow-up meeting."

The AI automatically extracts:

* HCP Name
* Interaction Type
* Topics Discussed
* Sentiment
* Outcomes
* Follow-up actions
* Appointment Date & Time

---

### 2. Smart Form Auto-Fill

Extracted AI fields automatically populate the interaction form using **Redux state management**.

Example extraction:

Input:

```
Met Dr Sharma today at 3pm to discuss OncoBoost trial.
```

AI Output:

```
{
  "hcp_name": "Dr Sharma",
  "topics_discussed": "OncoBoost clinical trial",
  "sentiment": "positive",
  "appointment_date": "2026-03-20T15:00:00"
}
```

Form fields are auto-filled accordingly.

---

### 3. AI Suggested Follow-ups

The system suggests intelligent next actions such as:

* Schedule follow-up meeting
* Send clinical trial report
* Invite HCP to webinar

---

### 4. Structured Interaction Storage

All interactions are stored in a database for future reference and analytics.

---

### 5. LangGraph AI Agent Workflow

The backend uses a **LangGraph workflow** to process user input and extract CRM fields using an LLM.

Flow:

```
User Input
   ↓
LangGraph Agent
   ↓
LLM Extraction
   ↓
Structured JSON Fields
   ↓
Database Storage
   ↓
Frontend Form Auto-fill
```

---

# 🏗️ Project Architecture

```
Frontend (React + Redux)
        │
        │ API Request
        ▼
Backend (FastAPI)
        │
        │
LangGraph AI Agent
        │
        ▼
Large Language Model (Groq / LLaMA)
        │
        ▼
Structured Interaction Fields
        │
        ▼
Database (MySQL)
```

---

# 🛠️ Tech Stack

## Frontend

* React
* Redux Toolkit
* Axios / Fetch API
* CSS

## Backend

* FastAPI
* SQLAlchemy
* LangGraph
* Groq LLM API

## Database

* MySQL

## AI

* LLaMA 3 (via Groq)
* Prompt-based information extraction

---

# 📂 Project Structure

```
project-root
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── AIAssistant.jsx
│   │   │   └── InteractionDetails.jsx
│   │   │   └──LogInteractionPage.jsx
│   │   ├── redux
│   │   │   ├── store.js
│   │   │   └── interactionSlice.js
│   │   │
│   │   ├
│   │   │
│   │   └── App.jsx
│
├── backend
│   ├── app
│   │   ├── ai
│   │   │   ├── extractor.py
│   │   │   ├── langgraph_agent.py
│   │   │   └── groq_client.py
│   │   │
│   │   ├── models
│   │   │   ├── interaction.py
│   │   │   └── hcp.py
│   │   ├── routes
│   │   │   └── interaction_routes.py
│   │   │
│   │   ├── database.py
│       └── main.py
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```
git clone https://github.com/akshatajadhav79/AI-First-CRM-HCP-Module
cd AI-First-CRM-HCP-Module
```

---

# Backend Setup

### Install dependencies

```
pip install -r requirements.txt
```

### Environment variables

Create `.env` file:

```
GROQ_API_KEY=your_groq_api_key
```

### Run backend

```
uvicorn app.main:app --reload
```

Backend will run on:

```
http://localhost:8000
```

---

# Frontend Setup

Navigate to frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Run frontend:

```
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# 🧠 AI Field Extraction Prompt

The system prompts the LLM to extract structured CRM data:

```
Extract CRM interaction fields from the following text.

Return JSON only.

Fields:
hcp_name
interaction_type
topics_discussed
sentiment
outcomes
follow_up
appointment_date
```

---

# 🔍 Example AI Interaction

User Input:

```
Met Dr Mehta today at 4pm to discuss oncology drug trial.
He seemed interested and asked for a follow-up meeting.
```

AI Extracted Fields:

```
{
 "hcp_name": "Dr Mehta",
 "topics_discussed": "Oncology drug trial",
 "sentiment": "positive",
 "follow_up": "Schedule follow-up meeting",
 "appointment_date": "2026-03-18T16:00:00"
}
```

---

# 📈 Future Improvements

* Voice-to-text interaction logging
* HCP interaction analytics dashboard
* AI meeting summaries
* Smart scheduling
* Integration with CRM systems

---

# 👩‍💻 Author

**Akshata Jadhav**

Python Developer | AI Enthusiast
LinkedIn: https://www.linkedin.com/in/akshata-jadhav-782679255/

---

# 📄 License

This project is for educational and demonstration purposes.
