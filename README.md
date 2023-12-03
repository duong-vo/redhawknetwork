# Django Backend and React Frontend Project

## Overview
This repository contains the source code for a web application built with Django as the backend framework and React for the frontend. The project utilizes Yarn as the package manager for managing frontend dependencies.

## Project Structure
- **backend:** Contains the Django backend code.
- **frontend:** Houses the React frontend code.
- **docs:** Documentation files for the project.

## Getting Started

### Prerequisites
Make sure you have the following installed on your system:
- [Python](https://www.python.org/downloads/release/python-3100/) (>=3.6)
- [Django](https://www.djangoproject.com/)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/duong-vo/redhawknetwork
   cd redhawknetwork
   ```
2. **Setup the Django backend:**\
    Open one terminal and run the following commands
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver
    ```
3. **Setup the React frontend:**\
    Open a different terminal and run the following commands
    ```bash
    yarn install
    yarn start
    ```
    Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.
