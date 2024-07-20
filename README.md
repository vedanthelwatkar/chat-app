## Objective

This project is a full-stack web application that demonstrates capabilities in both front-end and back-end development, with a focus on Python (Django) and JavaScript frameworks. It features user authentication, interest messaging, and a real-time chat system.

## Project Overview

The application allows users to:

1. **Register and log in** to the system.
2. **Browse other users** and send interest messages.
3. **Accept or reject** received interest messages.
4. **Chat in real-time** if the interest is accepted.

## Technology Stack

- **Backend:** Django (Python)
- **Frontend:** React (JavaScript)
- **Real-Time Communication:** Django Channels
- **Database:** MongoDB (integration with Django ORM), configurable to other databases

## Features

### 1. User Authentication

- User registration
- User login
- Password management

### 2. Sending Interests

- View a list of users
- Send interest messages to users

### 3. Accepting/Rejecting Interests

- View received interest messages
- Accept or reject interests

### 4. Chat System

- Real-time messaging
- Chat interface for users with accepted interests

## Installation

### Prerequisites

- Python 3.8+
- Node.js (for React)
- npm (or Yarn) for managing JavaScript dependencies

### Backend Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Create and activate a virtual environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Apply database migrations:

   ```bash
   python manage.py migrate
   ```

5. Create a superuser for accessing the admin interface:

   ```bash
   python manage.py createsuperuser
   ```

6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the React project directory:

   ```bash
   cd frontend
   ```

2. Install JavaScript dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## Running the Application

1. Ensure both the Django and React servers are running.
2. Access the application at `http://localhost:3000` (React) and `http://localhost:8000` (Django).

## Documentation

### Design Choices

- **Django** was chosen for the backend due to its robust features and built-in admin interface.
- **React** was chosen for the frontend to leverage its component-based architecture and state management capabilities.
- **Django Channels** was used to implement real-time chat functionality.

## Contact

For any questions or clarifications, please reach out to vedanthelwatkar@gmail.com.
