# Expense Tracker

A simple and responsive **Expense Tracker** built with **React**, **TypeScript**, and **Tailwind CSS**.  
Supports **dark/light mode toggle** and stores expenses in the browser's **local storage**.

## Features

- Add and delete expenses with description and amount
- Automatically calculates **total balance**
- Responsive layout for **mobile and desktop**
- **Dark/Light mode toggle** with sun/moon icons
- Data persisted in **localStorage** (optional)

## Demo

![Demo Screenshot](./src/assets/screenshot.png)

## Technologies Used

- **React** with Functional Components and Hooks (`useState`, `useEffect`, `useCallback`)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Icons** for theme toggle icons
- **localStorage** for persistence

## Installation

1. Clone the repository:
   git clone https://github.com/<your-username>/expense-tracker.git
   cd expense-tracker

Install dependencies:
npm install
npm install react-icons

Run the development server:
npm run dev
Open http://localhost:5173 in your browser.

Usage :
Enter a description and amount in the form.
Click Add to save the expense.
Click Delete to remove an expense.
Toggle Theme (sun/moon) to switch between dark and light mode.
Total balance is automatically calculated and displayed.

Tailwind Dark Mode
Dark mode is manually toggled using the Theme button.
Tailwind is configured with darkMode: 'class' in tailwind.config.js.
The toggle adds/removes the dark class from <html> dynamically.

Customization
Colors, spacing, and responsive breakpoints can be modified in tailwind.config.js.
You can replace emoji icons with any icons from react-icons library.

Contributing
Fork the repository.
Create a new branch: git checkout -b feature-name.
Commit your changes: git commit -m "Add feature".
Push to branch: git push origin feature-name.
Open a pull request.

License
This project is MIT licensed.

Author
Hafeez Mohammad
