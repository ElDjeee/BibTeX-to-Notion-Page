const { Client } = require('@notionhq/client');
const bibtexParse = require('bibtex-parse');

require('dotenv').config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.DATABASE_ID;

const notion = new Client({ auth: NOTION_API_KEY });

/**
 * Parses a BibTeX entry and extracts key fields.
 */
function parseBibtex(bibtex) {
    const parsed = bibtexParse.entries(bibtex);
    if (!parsed.length) {
        throw new Error("❌ Error: Invalid or empty BibTeX entry.");
    }
    
    const entry = parsed[0]; // Assume only one entry

    return {
        title: entry.TITLE || "Untitled",
        authors: entry.AUTHOR || "Unknown Author",
        journal: entry.JOURNAL || entry.ARCHIVEPREFIX || "Unknown Journal",
        year: entry.YEAR || "Unknown Year",
        url: entry.URL || null,
        bibtex: bibtex  // Include the full BibTeX entry for later use
    };
}

/**
 * Creates a Notion page with extracted BibTeX data.
 */
async function createNotionPage(articleData) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: DATABASE_ID },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: articleData.title
                            }
                        }
                    ]
                },
                Status: {
                    select: {
                        name: "In Progress"
                    }
                },
                Type: {
                    select: {
                        name: "Scientific Article"
                    }
                },
                Title: {
                    rich_text: [
                        { text: { content: articleData.title } }
                    ]
                },
                Authors: {
                    rich_text: [
                        { text: { content: articleData.authors } }
                    ]
                },
                Journal: {
                    rich_text: [
                        { text: { content: articleData.journal } }
                    ]
                },
                Year: {
                    rich_text: [
                        { text: { content: articleData.year } }
                    ]
                },
                "Related Links": {
                    url: articleData.url
                },
                BibTeX: {
                    rich_text: [
                        { text: { content: articleData.bibtex } }
                    ]
                }
            }
        });

        console.log("✅ Notion page created successfully!", response);
    } catch (error) {
        console.error("❌ Error creating Notion page:", error);
    }
}

// Get BibTeX entry from terminal arguments
if (process.argv.length <= 2) {
    console.error("❌ Error: No BibTeX entry provided. Please provide a valid BibTeX entry as an argument.");
    process.exit(1);
}

const bibtexEntry = process.argv.slice(2).join(" ");
try {
    const articleData = parseBibtex(bibtexEntry);
    createNotionPage(articleData);
} catch (error) {
    console.error(error.message);
    process.exit(1);
}
