# proj-sf-AccountDirectory

Salesforce projects and Trailhead-related work developed as part of my software engineering studies.

demo: https://github.com/KarenCampos842/proj-sf-AccountDirectory/tree/main/demo-video

demo (YouTube): https://youtu.be/8JIq6EI-r_c

## Account Search Directory (LWC)

### What I Built

A responsive Salesforce Lightning Web Component (LWC) that works as a searchable directory for Account records. It allows users to search and sort accounts while providing clear feedback during loading, when errors occur, or when no results are found.

**Key Features:**

- **Real-time Search:** Filters accounts dynamically by Account Name.
- **Dynamic Sorting:** Allows users to sort accounts by Name, Industry, or Phone in ascending or descending order.
- **UX State Management:** Provides visual feedback using SLDS, including loading spinners, error messages, and empty states when no accounts match the search.
- **Responsive Design:** Displays account information in a responsive card-based layout that adapts to different screen sizes.

### How I Built It

The component was developed with a focus on clean code, security, performance, and maintainability.

- **Frontend (LWC):** Built with JavaScript and HTML, using the Salesforce Lightning Design System (SLDS) for styling and platform consistency. A **300 ms debounce function** was added to delay server requests while the user is typing, reducing unnecessary calls to the backend.

- **Backend (Apex):** Implemented an Apex controller (`AccountSearchController.cls`) using `@AuraEnabled(cacheable=true)`. This allows Salesforce to cache results on the client and reuse them when possible instead of making a new server request for every search.

- **Security and Best Practices:**
  - The Apex class uses `with sharing`, and the SOQL query uses `WITH USER_MODE` to respect the user's object and field-level permissions.
  - SOQL injection is prevented through bind variables (`:searchPattern`) and a whitelist of allowed fields for dynamic sorting.
  - Constants are used instead of hard-coded values where appropriate, and the code includes JSDoc and ApexDoc documentation.

- **Testing:** Includes an Apex test class (`AccountSearchControllerTest.cls`) that covers the search logic, sorting behavior, and security-related fallbacks.

## Salesforce Account Directory (Local React App)

### What I Built

A local React application that recreates the main functionality of the Salesforce Account Directory as a standalone web application. It displays a list of account records and allows users to search and sort the data directly in the browser.

**Key Features:**

- **Search:** Filters accounts in real time by Account Name.
- **Sorting:** Sorts accounts by Account Name, Industry, or Phone.
- **Sort Direction:** Allows users to switch between ascending and descending order.
- **Empty States:** Displays a message when no accounts match the search criteria.
- **Responsive Interface:** Adapts the layout to different screen sizes.

### How I Built It

The application was developed with **React** and **Vite**, using a simple component structure to keep the search and sorting logic organized and easy to maintain.

- **Data Source:** Uses a local static JSON file (`Account_Sample_Data.json`) as its only data source. The application does not connect to Salesforce or use external APIs.

- **Architecture:** The main container component (`AccountExplorer`) manages the application state and the search and sorting logic using React hooks such as `useState` and `useMemo`. A reusable `Account` component is responsible for rendering each account row.

- **Styling:** Uses custom CSS to create an interface inspired by the Salesforce Lightning Design System (SLDS), with clear typography, consistent spacing, neutral colors, and visual indicators for sorting.

## Installation and Usage

### Salesforce LWC Project

#### Prerequisites

- [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli) installed.
- Visual Studio Code with the **Salesforce Extension Pack** installed.
- A Salesforce Sandbox or Developer Edition Org.

#### Installation

1. **Create a Salesforce Project:**  
   Open VS Code, press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS), run `SFDX: Create Project`, and choose the **Standard** template.

2. **Authorize your Org:**  
   Open the command palette and run `SFDX: Authorize an Org`, then log in to your Salesforce environment.

3. **Add the Project Files:**  
   Copy `AccountSearchController.cls` and `AccountSearchControllerTest.cls` into the `classes` folder of your project. 
   Create an LWC named `accountSearchDirectory` and add the HTML, JavaScript, and `.js-meta.xml` files. 

4. **Deploy the Apex classes and the LWC:**  
   Right-click the `classes` folder and select **SFDX: Deploy Source to Org**. Then, right-click the `lwc` folder and select **SFDX: Deploy Source to Org**.

#### Add the Component to a Salesforce Page

1. Log in to your Salesforce Org and open an app with a Home page, such as the **Nonprofit Success Pack
or Sales** app.
2. Open the **Home** tab.
3. Click the **Gear icon** in the top-right corner and select **Edit Page** to open Lightning App Builder.
4. In the left sidebar, find the **Custom** components section.
5. Drag the **Account Search Directory** component onto the page.
6. Click **Save**.
7. Click **Activate**, select **Assign as Org Default**, and save the changes.
8. Return to the Home page and use the component.

### React Application

#### Prerequisites

Ensure that [Node.js](https://nodejs.org/) and npm are installed on your machine.

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
