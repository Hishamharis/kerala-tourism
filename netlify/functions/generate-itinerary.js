/**
 * Netlify Function: proxy Gemini itinerary generation (server-side API key).
 */

function buildPrompt({ districts, days, styles, budget }) {
  return `Create a detailed ${days}-day Kerala travel itinerary for: ${districts.join(', ')}.
Travel style: ${styles.join(', ')}.
Budget: ${budget}.

Respond ONLY with a valid JSON array. No markdown, no code fences, no explanation.
Schema:
[
  {
    "day": 1,
    "location": "District Name",
    "title": "Catchy day title",
    "morning": "Morning activity description",
    "afternoon": "Afternoon activity description",
    "evening": "Evening activity description",
    "stay": "Accommodation type",
    "food": "Must-try dish today",
    "tip": "Local insider tip"
  }
]`;
}

function generateMockItinerary({ districts, days }) {
  const activities = {
    morning: [
      'Start with a sunrise yoga session by the lakeside',
      'Visit the ancient temple complex as the morning mist lifts',
      'Take a guided heritage walk through the old quarter',
      'Embark on a wildlife safari through the reserve',
      'Cruise along the backwater canals at dawn',
      'Hike to the peak for panoramic valley views',
    ],
    afternoon: [
      'Explore the spice plantation with a guided tasting tour',
      'Visit the local museum and art gallery',
      'Take a traditional cooking class with local chefs',
      'Relax on the pristine beach with fresh coconut water',
      'Shop for handloom textiles and local handicrafts',
      'Visit the tea factory and sample fresh estate tea',
    ],
    evening: [
      'Watch a traditional Kathakali performance',
      'Enjoy a sunset cruise on the lake',
      'Dine on fresh seafood at a cliffside restaurant',
      'Attend a Theyyam ritual ceremony',
      'Stroll through the night market for street food',
      'Unwind with an Ayurvedic spa treatment',
    ],
  };

  const stays = ['Heritage Homestay', 'Houseboat Suite', 'Tea Estate Bungalow', 'Beach Resort', 'Treehouse Villa', 'Boutique Hotel'];
  const foods = ['Kerala Sadya', 'Karimeen Pollichathu', 'Malabar Biryani', 'Appam & Stew', 'Prawn Moilee', 'Puttu & Kadala Curry'];
  const tips = [
    'Ask your houseboat captain about hidden canal routes',
    'Visit temples before 9 AM to avoid crowds',
    'Try the local toddy shop for authentic Kerala snacks',
    'Carry mosquito repellent for evening walks',
    'Hire a local guide — their stories are worth every rupee',
    'The best views are always a short hike away',
  ];

  const result = [];
  for (let i = 0; i < days; i++) {
    const dist = districts[i % districts.length];
    result.push({
      day: i + 1,
      location: dist,
      title: `Discovering ${dist}`,
      morning: activities.morning[i % activities.morning.length],
      afternoon: activities.afternoon[i % activities.afternoon.length],
      evening: activities.evening[i % activities.evening.length],
      stay: stays[i % stays.length],
      food: foods[i % foods.length],
      tip: tips[i % tips.length],
    });
  }
  return result;
}

function validateItineraryPayload(body) {
  if (!body || typeof body !== 'object') return 'Invalid JSON body';
  const { districts, days, styles, budget } = body;
  if (!Array.isArray(districts) || districts.length === 0) return 'districts must be a non-empty array';
  if (!districts.every((d) => typeof d === 'string' && d.length > 0 && d.length < 120)) {
    return 'districts must be non-empty strings';
  }
  if (districts.length > 20) return 'too many districts';
  const n = Number(days);
  if (!Number.isInteger(n) || n < 3 || n > 14) return 'days must be an integer 3–14';
  if (!Array.isArray(styles) || !styles.every((s) => typeof s === 'string' && s.length < 80)) {
    return 'styles must be an array of strings';
  }
  if (typeof budget !== 'string' || budget.length > 80) return 'invalid budget';
  return null;
}

function validateItineraryArray(data) {
  if (!Array.isArray(data) || data.length === 0) return false;
  const keys = ['day', 'location', 'title', 'morning', 'afternoon', 'evening', 'stay', 'food', 'tip'];
  return data.every((row) => {
    if (!row || typeof row !== 'object') return false;
    return keys.every((k) => typeof row[k] === 'string' && row[k].length > 0);
  });
}

export const handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid JSON' }),
    };
  }

  const payloadErr = validateItineraryPayload(body);
  if (payloadErr) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: payloadErr }),
    };
  }

  const { districts, days, styles, budget } = body;
  const apiKey = process.env.GEMINI_API_KEY;

  const respond = (itinerary, warning, extraHeaders = {}) => ({
    statusCode: 200,
    headers: {
      ...headers,
      ...extraHeaders,
      ...(warning ? { 'X-Itinerary-Warning': warning } : {}),
    },
    body: JSON.stringify({ itinerary, warning: warning || null }),
  });

  if (!apiKey) {
    const mock = generateMockItinerary({ districts, days });
    return respond(mock, 'Server missing GEMINI_API_KEY; returned mock itinerary.', {
      'X-Itinerary-Source': 'mock',
    });
  }

  const prompt = buildPrompt({ districts, days, styles, budget });

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 2048,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('[generate-itinerary] Gemini error:', geminiRes.status, errText);
      const mock = generateMockItinerary({ districts, days });
      return respond(mock, `Gemini API failed (${geminiRes.status}); returned mock itinerary.`);
    }

    const data = await geminiRes.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) {
      const mock = generateMockItinerary({ districts, days });
      return respond(mock, 'Empty Gemini response; returned mock itinerary.');
    }

    const clean = text.replace(/```json|```/g, '').trim();
    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (e) {
      console.error('[generate-itinerary] JSON parse failed:', e.message);
      const mock = generateMockItinerary({ districts, days });
      return respond(mock, 'Could not parse AI response as JSON; returned mock itinerary.');
    }

    if (!validateItineraryArray(parsed)) {
      const mock = generateMockItinerary({ districts, days });
      return respond(mock, 'AI response failed schema validation; returned mock itinerary.', {
        'X-Itinerary-Fallback': 'invalid-schema',
      });
    }

    return respond(parsed, null, { 'X-Itinerary-Source': 'gemini' });
  } catch (err) {
    console.error('[generate-itinerary]', err);
    const mock = generateMockItinerary({ districts, days });
    return respond(mock, `Unexpected error: ${err.message}; returned mock itinerary.`);
  }
};
