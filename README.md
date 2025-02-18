# BibTeX to Notion Page (Demo)
This is a **demo** script that parses a BibTeX entry and creates a corresponding page in a Notion database. It uses the [Notion API](https://developers.notion.com/) to automate the process.

## 🚀 Getting Started

### **1. Install Dependencies**
Make sure you have **Node.js** installed on your system. If not, install it from [Node.js official website](https://nodejs.org/).

Then, set up your project:
```sh
npm init -y
npm install @notionhq/client bibtex-parse dotenv
```

### **2. Configure Environment Variables**
Create a `.env` file in your project directory and add your Notion API credentials:

```sh
touch .env
```

Open `.env` and insert the following:
```ini
NOTION_API_KEY=YOUR_NOTION_API_KEY
DATABASE_ID=YOUR_DATABASE_ID
```
> Replace `YOUR_NOTION_API_KEY` and `YOUR_DATABASE_ID` with your actual Notion API key and database ID.

### **3. Run the Script**
Execute the script using:
```sh
node index.js "YOUR_BIBTEX_RAW_STRING"
```
Example:
```sh
node index.js "@article{sample, author={John Doe}, title={Example Title}, year={2024}, url={http://example.com}}"
```

## 🛠 How to Get Your Notion API Key and Database ID

### **🔴 Important Warning**
Before obtaining your Notion API key, you must first create a Notion integration. This tutorial will guide you through the process of setting up an integration and obtaining your API key: Follow this tutorial carefully:
📖 **[How to Create a Notion Integration](https://developers.notion.com/docs/create-a-notion-integration)**

### **🔍 Finding Your Database ID**
Once you have your API key, you can retrieve your database ID using this guide:
📖 **[How to Retrieve a Notion Database ID](https://developers.notion.com/reference/retrieve-a-database)**

### **4. Notes**
- This script is a **demo** and should not be used in production without modifications.
- Ensure that your Notion database is configured with the necessary properties (`Title`, `Authors`, `Year`, etc.).
- If your `.env` file is not loading, verify it is correctly formatted and try running:
  ```sh
  console.log(process.env.NOTION_API_KEY);
  ```

## 📜 License
This project is released under the **MIT License**.

