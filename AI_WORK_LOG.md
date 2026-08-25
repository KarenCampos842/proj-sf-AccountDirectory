# AI_WORK_LOG.md

---

**AI Tool Used:** Gemini  
**Important Prompt:** "I need to create a Lightning Web Component displaying Account records with search, sorting, and loading/empty states following Clean Code principles."

**Problem It Caused:** The generated component included a loading state, but the spinner only appeared when the component first loaded. It did not appear again when performing a new search. This happened because the `@wire` callback only runs after new data or an error is received, so `isLoading` was never set back to `true` when a new search started.

**How I Checked/Fixed It:** I had Claude review the generated code before using it. Claude identified the issue with the `@wire` callback and suggested setting `this.isLoading = true` inside the debounce `setTimeout` in `handleSearchTermChange`, just before updating `searchTerm`. I then passed this diagnosis to Gemini, which implemented the fix.

---

**AI Tool Used:** Gemini  
**Important Prompt:** "Write a React component to parse static JSON data and implement search filtering and column sorting."

**Problem It Caused:** The generated sorting function modified the original state array directly by using `data.sort()`. This caused issues with React's state management, and the table rows and custom sort indicators stopped updating correctly when clicking the column headers.

**How I Checked/Fixed It:** I had Claude review the generated code before using it. Claude identified that the original state array was being modified directly during sorting and recommended creating a copy of the array before sorting it. I then passed this diagnosis to Gemini, which fixed the issue by using the spread operator (`[...data].sort()`) before updating the state.

---

**AI Tool Used:** Gemini  
**Important Prompt:** "SonarCloud flags `baseUrl` as deprecated in this jsconfig.json. Fix it." + the pasted file

**Problem It Caused:** SonarCloud flagged the `baseUrl` option in `jsconfig.json` as deprecated. The option is deprecated in TypeScript 6.0 and is planned for removal in TypeScript 7.0.

**How I Checked/Fixed It:** I asked Gemini to fix the issue after SonarCloud flagged it in VS Code. Gemini removed `baseUrl`, updated the `paths` mapping from `"c/*": ["*"]` to `"c/*": ["./*"]`, and added `"experimentalDecorators": true`. The resulting configuration follows TypeScript's migration guidance and Salesforce's recommended configuration for LWC projects.

---
