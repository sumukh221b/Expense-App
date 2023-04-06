# Expense-App (REACT + REDUX + NODE)
Expense management app involves the process of tracking, analyzing, and controlling expenses within an organization or individual.

This app track all your expenses: Record all expenses, including small ones, as they add up over time.
Categorize expenses into different categories such as travel, food, entertainment, etc., to better understand where your money is going.
Review your expenses regularly to identify areas where you can cut back or reduce costs. For example, you may realize that you are overspending on dining out, and you can adjust your budget accordingly.

An Expense App for authenticated Users.

- 🛠️ Tech Stack
- 💻 JavaScript | ES6
- 🌐 React JS
- 🔧 Git
- 📦 Redux, Redux-thunk, React-redux, Bootstrap V5 ,React-router-dom, Axios, Formik and Yup.

## Features
### User Authentication.
- User can Register and then log into the account.
- Used Formik to build forms and for validation used Yup.
- User Profile Details are shown on the Profile Page.

### Expenses

- User can add, update, delete and view his expenses on home page.
- User can update his budget and add categories in the setting page.
- Users can view individual expenses & the categories the expenses belongs on home page.
-	Particular expenses and categories are shown in the card and add or edit expenses are shown in modal using Bootstrap.
-	Statistical Data of expenses against categories and total budget against total expenses are shown in chart using react-google-chart.
- User expenses and categories are stored in the backend so that the user can log in to his account to view them anytime.

### More about the Project:

On User Logging In fetching user account details & expenses, so that no need to make a request again when the user is switching between the account and home Page.
After Log Out if a user tries to access the account page he will be redirected to the about us page.

### Manual Setup
Download the project folder, then go to expense-app-frontend and run `npm start` to view the Project.
