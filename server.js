import 'dotenv/config'; // To load environment variables from .env file
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 5000;

const geminiApiKey = "";//api key here

if (!geminiApiKey) {
  console.error("❌ GEMINI_API_KEY is missing in .env file.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// Root
app.get('/', (req, res) => {
  res.send('🌐 AI Code Converter, Translator & Summarizer API is running 🚀');
});

// Convert Code
app.post('/convert-code', async (req, res) => {
  const { sourceCode, sourceLang, targetLang } = req.body;

  if (!sourceCode || !sourceLang || !targetLang) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `Convert this ${sourceLang} code to ${targetLang}:\n\n${sourceCode}` }]
            }
          ]
        })
      }
    );

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("Error from Gemini API (convert-code):", data);
      return res.status(500).json({ error: "Gemini API error during code conversion." });
    }

    const convertedCode = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Conversion failed!";
    res.json({ convertedCode });

  } catch (error) {
    console.error("Code Conversion Error:", error);
    res.status(500).json({ error: "Server error during code conversion." });
  }
});

// Translate Text
app.post('/translate', async (req, res) => {
  const { text, sourceLang, targetLang } = req.body;

  if (!text || !sourceLang || !targetLang) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `Translate this text from ${sourceLang} to ${targetLang}:\n\n${text}` }]
            }
          ]
        })
      }
    );

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("Error from Gemini API (translate):", data);
      return res.status(500).json({ error: "Gemini API error during translation." });
    }

    const translation = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Translation failed!";
    res.json({ translation });

  } catch (error) {
    console.error("Translation Error:", error);
    res.status(500).json({ error: "Server error during translation." });
  }
});

// Summarize Content (Both YouTube and Paragraph)
app.post('/summarize', async (req, res) => {
  const { text, videoUrl, paragraph } = req.body;

  if (!text && !videoUrl && !paragraph) {
    return res.status(400).json({ error: "Missing content for summarization" });
  }

  let contentToSummarize = "";
  if (videoUrl) {
    contentToSummarize = `Summarize this link:\n\n${videoUrl}`;
  } else if (paragraph) {
    contentToSummarize = `Summarize this paragraph:\n\n${paragraph}`;
  } else if (text) {
    contentToSummarize = `Summarize this text:\n\n${text}`;
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: contentToSummarize }]
            }
          ]
        })
      }
    );

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("Error from Gemini API (summarize):", data);
      return res.status(500).json({ error: "Gemini API error during summarization." });
    }

    const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Summary failed!";
    res.json({ summary });

  } catch (error) {
    console.error("Summarization Error:", error);
    res.status(500).json({ error: "Error summarizing the content." });
  }
});

// Grammar Check
app.post('/api/grammar-check', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing text" });
  }

  if (text.length > 5000) {
    return res.status(400).json({ error: "Text too long (limit 5000 characters)" });
  }

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `Correct grammar and improve this text:\n\n${text}` }]
            }
          ]
        })
      }
    );

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("Gemini API Error (grammar-check):", data);
      return res.status(500).json({ error: "Gemini API error during grammar checking." });
    }

    const grammarResult = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Grammar check failed.";
    res.json({ result: grammarResult });

  } catch (error) {
    console.error("Grammar Checking Error:", error);
    res.status(500).json({ error: "Server error during grammar check." });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
