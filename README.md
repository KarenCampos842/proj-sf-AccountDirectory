# proj-sf-AccountDirectory
Salesforce projects and Trailhead-related work developed as part of my software engineering studies.

# Account Search Directory (LWC)

## What I Built
A responsive Salesforce Lightning Web Component (LWC) that serves as a dynamic directory for Account records. The component provides a highly optimized, user-friendly interface to search and sort Accounts in real-time.

**Key Features:**
* **Real-time Search:** Filters records dynamically by Account Name.
* **Dynamic Sorting:** Allows users to sort by Name, Industry, or Phone in both Ascending and Descending order.
* **UX State Management:** Includes robust visual feedback using SLDS, featuring loading states (spinners) during data fetching, error states, and empty states when no records match the criteria.
* **Responsive Design:** Displays data in an elegant, responsive grid of cards that adapts to desktop and mobile screens.

## How I Built It
This project was built following Clean Code principles, focusing on security, performance, and maintainability.

* **Frontend (LWC):** Built using modern JavaScript and HTML. I utilized the Salesforce Lightning Design System (SLDS) for styling to maintain platform consistency without relying on custom CSS. I implemented a **debounce function (300ms)** in the JavaScript controller to delay server calls while the user is typing, significantly reducing server load.
* **Backend (Apex):** Created an Apex Controller (`AccountSearchController.cls`) using the `@AuraEnabled(cacheable=true)` decorator, which caches the method's results on the client so repeated searches can reuse cached data instead of always round-tripping to the server.
* **Security & Best Practices:**
  * The Apex class uses `with sharing` and the SOQL query enforces `WITH USER_MODE` to strictly respect user Field-Level Security (FLS) and Object permissions.
  * Prevented SOQL Injection by utilizing bind variables (`:searchPattern`) and implementing strict Apex-level whitelisting for the dynamic sorting fields.
  * Avoided "magic numbers" by using constants and documented the code thoroughly using JSDoc and ApexDoc.
* **Testing:** Included an Apex Test Class (`AccountSearchControllerTest.cls`) to ensure search logic, sorting behavior, and security fallbacks function properly.

## How to Install and Run

### Prerequisites
* [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli) installed.
* Visual Studio Code with the **Salesforce Extension Pack** installed.
* A Salesforce Sandbox or Developer Edition Org.

### Installation Steps
1. **Create a Salesforce Project:**
   Open VS Code, press `Ctrl+Shift+P` (or `Cmd+Shift+P`), run `SFDX: Create Project`, and choose the Standard template.
2. **Authorize your Org:**
   Run `SFDX: Authorize an Org` in the command palette and log into your Salesforce environment.
3. **Deploy the Backend (Apex):**
   * Copy `AccountSearchController.cls` and `AccountSearchControllerTest.cls` into the `classes` folder of your local project.
   * Right-click the `classes` folder and select **SFDX: Deploy Source to Org**.
4. **Deploy the Frontend (LWC):**
   * Create the LWC named `accountSearchDirectory`.
   * Copy in the HTML, JS, and `.js-meta.xml` files.
   * Right-click the `lwc` folder and select **SFDX: Deploy Source to Org**.

### How to Run (UI Setup)
1. Log in to your Salesforce Org and navigate to any app with a Home page (e.g., the **Sales** app).
2. Go to the **Home** tab.
3. Click the **Gear icon** (Setup) in the top right corner and select **Edit Page** to open the Lightning App Builder.
4. On the left sidebar, scroll down to the **Custom** components section.
5. Drag and drop the **Account Search Directory** component onto the page layout.
6. Click **Save** in the top right corner.
7. Click **Activate**, choose **Assign as Org Default**, and save your changes.
8. Click the back arrow to return to the Home page and use your new component!

# Salesforce Account Directory (Local React App)

## What I Built
I built a local React application that simulates a Salesforce Account Directory interface. The application displays a list of enterprise accounts and provides responsive, client-side functionality to:
* **Search:** Filter accounts in real-time by their name.
* **Sort:** Order the data by specific fields (Account Name, Industry, or Phone).
* **Toggle Direction:** Switch between ascending and descending order.
* **Empty States:** Display a user-friendly UI message when a search yields no matching results.

## How I Built It
This project was developed using **React** and **Vite** for a fast, modern development environment.
* **Data Source:** The application strictly parses a provided local static JSON file (`Account_Sample_Data.json`). There is **no live Salesforce integration** or external API fetching involved.
* **Architecture:** It follows a clean, modular component structure. A main smart container (`AccountExplorer`) manages the state and logic (using `useState` and `useMemo` for optimized sorting and filtering), while a reusable presentation component (`Account`) renders each individual table row.
* **Styling:** Custom CSS was written to closely mimic the enterprise aesthetic of the Salesforce Lightning Design System (SLDS), featuring neutral colors, clear typography, custom sort indicators, and consistent spacing.

## How to Install and Run

### Prerequisites
Ensure you have [Node.js and npm](https://nodejs.org/) installed on your machine.

### 1. Install Dependencies
Open your terminal, navigate to the root folder of the project, and run the following command to install all required packages:
```bash
npm install
```

### 2. Run the Development Server
Start the local Vite dev server:
```bash
npm run dev
```

### 3. Open the App
Vite prints a local URL in the terminal — typically `http://localhost:5173` — open it in your browser to view the Account Directory.
