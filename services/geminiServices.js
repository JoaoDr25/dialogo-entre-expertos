import 'dotenv/config';
import fetch from 'node-fetch';

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

export async function obtenerRespuesta(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

  const body = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    const textoRespuesta = data.candidates[0].content.parts[0].text;

    return textoRespuesta;

  } catch (error) {
    console.error("Error desde Gemini REST:", error.message);
    throw new Error("No se pudo obtener respuesta desde Gemini REST");
  }
}
