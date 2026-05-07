/** Calls Netlify function `/api/generate-itinerary` (same-origin on deploy). Local `vite` has no function → mock fallback. */

const API_PATH = '/api/generate-itinerary';

export function validateItineraryArray(data) {
  if (!Array.isArray(data) || data.length === 0) return false;
  const keys = ['day', 'location', 'title', 'morning', 'afternoon', 'evening', 'stay', 'food', 'tip'];
  return data.every((row) => {
    if (!row || typeof row !== 'object') return false;
    return keys.every((k) => typeof row[k] === 'string' && row[k].length > 0);
  });
}

/**
 * @returns {{ itinerary: Array, warning?: string }}
 */
export async function generateItinerary({ districts, days, styles, budget }) {
  try {
    const response = await fetch(API_PATH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ districts, days, styles, budget }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      console.warn('[Itinerary] API unavailable:', response.status, text);
      return {
        itinerary: generateMockItinerary({ districts, days, styles, budget }),
        warning:
          response.status === 404
            ? 'AI endpoint unavailable locally — showing sample itinerary. Run `netlify dev` or deploy to Netlify for live AI.'
            : `Request failed (${response.status}); showing sample itinerary.`,
      };
    }

    const payload = await response.json();
    let itinerary = payload.itinerary ?? payload;

    if (!validateItineraryArray(itinerary)) {
      console.warn('[Itinerary] Response failed validation');
      return {
        itinerary: generateMockItinerary({ districts, days, styles, budget }),
        warning: payload.warning || 'Invalid itinerary shape from server; showing sample itinerary.',
      };
    }

    const headerWarning = response.headers.get('X-Itinerary-Warning');
    const warning = payload.warning || headerWarning || undefined;

    return { itinerary, warning };
  } catch (err) {
    console.error('[Itinerary] Falling back to mock:', err.message);
    return {
      itinerary: generateMockItinerary({ districts, days, styles, budget }),
      warning: 'Could not reach itinerary service — showing sample itinerary.',
    };
  }
}

export function generateMockItinerary({ districts, days }) {
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
