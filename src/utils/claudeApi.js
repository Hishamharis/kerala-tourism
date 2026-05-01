const API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;

export async function generateItinerary({ districts, days, styles, budget }) {
  if (!API_KEY || API_KEY === 'your_key_here') {
    // Return mock data for demo
    return generateMockItinerary({ districts, days, styles, budget });
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `Create a detailed ${days}-day Kerala travel itinerary for: ${districts.join(', ')}.
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
]`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API call failed: ${err}`);
  }

  const data = await response.json();
  const text = data.content[0].text.trim();
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
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
