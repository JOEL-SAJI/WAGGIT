# Waggit Web Application

This is a full-stack pet store application built with HTML, CSS, JavaScript (React), PHP, and MySQL. It allows users to access a web-based platform connected to a backend database.

## Requirements

- [XAMPP](https://www.apachefriends.org/) (for PHP and MySQL)
- [Node.js & npm](https://nodejs.org/)
- [Python](https://www.python.org/) (optional or specify usage if needed)

## Setup Instructions

Follow these steps to set up and run the application locally:

1. **Place PHP Files:**
   - Copy the `phpfile` folder into the default PHP server directory (e.g., `C:\xampp\htdocs\phpfile`).

2. **Start Backend Servers:**
   - Open the XAMPP Control Panel.
   - Start **Apache** and **MySQL** servers.

3. **Set Up Frontend:**
   - Open the `waggit-main` folder using Visual Studio Code.
   - Open a terminal inside VS Code.

4. **Configure Execution Policy (PowerShell only):**
   ```bash
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```

5. **Install Dependencies:**

   ```bash
   npm install
   ```

6. **Run Development Server:**

   ```bash
   npm run dev
   ```

7. **Access the Application:**

   * Open the development server URL provided in the terminal.
   * PHP files will be accessible at: [http://localhost/phpfile/](http://localhost/phpfile/) 


## Tech Stack

* **Frontend:** React, Vite, JavaScript
* **Backend:** PHP
* **Database:** MySQL
* **Tools:** XAMPP, VS Code

---

## Project Structure

```
waggit-main/
├── public/
├── src/
│   ├── components/
│   └── ...
├── phpfile/        <-- PHP scripts for backend
├── package.json
├── README.md
```

---

## 📎 Notes

* Make sure MySQL is properly configured with the required database and tables.
* If Python is required, please specify its purpose in the project.

---

## Author

[https://github.com/JOEL-SAJI](Johny)
[http://localhost/phpfile/](Joel Saji)
