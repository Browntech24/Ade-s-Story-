/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

// Health and Config Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Story expansion / next chapter generation with Gemini 3.8 Flash
app.post('/api/story/expand', async (req, res) => {
  try {
    const { prompt, tone, focusCharacter } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(400).json({
        error: 'GEMINI_API_KEY is not configured in the environment. Please check the Secrets panel.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `You are a master literary novelist and cultural storyteller writing in the classic West African reader tradition (in the heritage of Michael Crowder, Onuora Nzekwu, Cyprian Ekwensi, and Chinua Achebe).
The story is titled "Ade Goes to School", centered on 8-year-old Ade from the village of Ilode on his first day at St. Jude's Community Academy.
Key elements:
- Ade: eight years old, wears a starched khaki uniform with navy piping, holds grandfather's river pebble.
- Mama Bisi: mother who pressed the uniform with glowing mahogany coals in a charcoal iron.
- Baba Tunde: wise grandfather who reminded him to remember where the river flows.
- Simi: older sister in Primary 4, carrying books with raffia cord.
- Folu: little blacksmith's son whose slate Ade rescued from Oshun Brook.
- Master Adeleke: teacher with horn-rimmed spectacles and chalkboard guidelines.
- Setting: Ilode, with its red laterite roads, morning market puff-puff, wooden bridge, and scarlet flamboyant flame tree.

Write a richly descriptive chapter or continuation in evocative literary prose (approx 3-5 paragraphs). Maintain authentic sensory details, dignity, warmth, and gentle humor. Format with an evocative Chapter Title as a heading followed by the narrative.`;

    const userMessage = `Write an authentic next chapter or scene following this direction:
Prompt: "${prompt || "Ade's first recess under the great flame tree"}"
Tone: ${tone || 'Warm, reflective, sensory'}
Focus Character: ${focusCharacter || 'Ade'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userMessage,
      config: {
        systemInstruction,
      },
    });

    const text = response.text ?? '';
    return res.json({ text });
  } catch (err: any) {
    console.error('Error generating story expansion:', err);
    return res.status(500).json({
      error: err.message || 'Unable to generate story expansion.',
    });
  }
});

// Character Inquiries / Dialogue
app.post('/api/story/character-qa', async (req, res) => {
  try {
    const { character, question } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `You are roleplaying as ${character || 'Ade'} from the short story "Ade Goes to School".
Character choices:
- "Ade": An eight-year-old boy in Ilode starting Primary One. Eager, observant, polite, proud of his neat khaki uniform and river stone.
- "Baba Tunde": Ade's grandfather, revered village elder with deep memory and patient wisdom.
- "Master Adeleke": The primary school master at St. Jude's, respectful, eloquent, encouraging young minds.
- "Iya Morayo": The vibrant market vendor who makes golden puff-puff and cheers for the neighborhood children.
Answer the user's question directly in character with authentic speech cadence and cultural warmth (1-2 concise paragraphs).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: question || 'How did you feel when you heard the big brass bell ring?',
      config: {
        systemInstruction,
      },
    });

    return res.json({ answer: response.text ?? '' });
  } catch (err: any) {
    console.error('Character dialogue error:', err);
    return res.status(500).json({ error: err.message || 'Failed to retrieve character dialogue.' });
  }
});

// Mount Vite or Static Files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
