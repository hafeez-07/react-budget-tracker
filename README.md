# 💰 Expense Tracker

A simple and responsive expense tracking app built with **React + TypeScript + Tailwind CSS**.  
It allows users to add, view, and delete expenses grouped by date.

## 🚀 Features

- ➕ Add expenses with description, amount, and date
- 📅 Expenses are automatically grouped by date
- 🔢 Expenses are displayed in a numbered list
- 🗑️ Delete an expense with a confirmation dialog
- 🌙 Dark mode support
- 💾 Data is stored in **localStorage**, so your expenses persist even after refresh

## 🖼️ Preview

![App Screenshot](./src/assets/screenshot.png)

## 🛠️ Tech Stack

- ⚛️ **React** (with TypeScript)
- 🎨 **Tailwind CSS** for styling
- 💽 **LocalStorage** for persistence

## 📂 Project Structure

src/
├── components/
│ ├── UserInput.tsx # Form to add new expenses
│ ├── ExpenseList.tsx # List of expenses grouped by date
│
├── App.tsx # Main app logic
├── index.tsx # Entry point

## ⚡ Installation & Setup

Clone the repo and install dependencies:

git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
npm install
npm install react-icons

Run the development server:
npm run dev

Build for production:

npm run build
🎯 Usage

Enter a description, amount, and select a date.

Your expense will be added under the chosen date.

To delete an expense, click Delete → confirm deletion.

📌 Roadmap / Future Improvements
✨ Add edit functionality for expenses

📊 Show total spent per day / per month

📈 Graph view of expenses

☁️ Sync with backend / database

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit a PR.

📜 License
This project is licensed under the MIT License.
