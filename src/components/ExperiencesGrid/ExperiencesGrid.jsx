import { useState } from 'react';
import ExperienceCard from './ExperienceCard';
import ExperienceModal from './ExperienceModal';
import styles from './ExperiencesGrid.module.css';

const experiences = [
  {
    title: 'Backwaters & Houseboats',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
    districts: ['Alappuzha', 'Kumarakom'],
    icon: '🛶',
    visitors: '28.6L',
    rating: 4.9,
    bestSeason: 'Sep – Mar',
    history: 'Kerala\'s backwaters are a chain of brackish lagoons and lakes lying parallel to the Arabian Sea coast. This 900 km network of interconnected canals, rivers, and inlets was historically the lifeline of trade between the Malabar Coast and the interior. The Kettuvallam (houseboat) tradition dates back centuries — these were originally rice barges used to transport goods from Kuttanad to Kochi port. Today, over 2,000 houseboats operate across the backwaters, forming one of Kerala\'s most iconic tourism experiences.',
    highlights: [
      { label: 'Vembanad Lake', desc: 'India\'s longest lake stretching 96 km — host to the famous Nehru Trophy Boat Race' },
      { label: 'Kumarakom Bird Sanctuary', desc: 'A 14-acre paradise for migratory birds set among mangrove forests' },
      { label: 'Alleppey Canals', desc: 'UNESCO-listed network of palm-fringed canals — the "Venice of the East"' },
      { label: 'Kuttanad Farming', desc: 'One of the few places in the world where farming happens below sea level' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1602158123333-e0c21fc4a225?w=600&q=80',
      'https://images.unsplash.com/photo-1609340667509-e9505f2a1f04?w=600&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=80',
    ],
  },
  {
    title: 'Hills & Tea Gardens',
    image: 'https://images.unsplash.com/photo-1597735881932-d9664c9bbcea?w=800&q=80',
    districts: ['Munnar', 'Wayanad'],
    icon: '🏔️',
    visitors: '46.7L',
    rating: 4.9,
    bestSeason: 'Sep – May',
    history: 'The Western Ghats, a UNESCO World Heritage Site, form Kerala\'s eastern backbone. The tea plantations of Munnar were established in the 1880s by the British, when Scottish planter John Daniel Munro developed the first estate at 1,600m elevation. Munnar\'s Kanan Devan Hills now span 24,000 hectares — one of the largest tea-producing regions in India. Wayanad\'s Edakkal Caves contain petroglyphs dating back to 6,000 BCE, making them among the earliest evidence of human civilization in South India.',
    highlights: [
      { label: 'Eravikulam National Park', desc: 'Home to the endangered Nilgiri Tahr — one of the world\'s rarest mountain goats' },
      { label: 'Chembra Peak', desc: 'At 2,100m, this peak hides a natural heart-shaped lake at its summit' },
      { label: 'Tea Museum', desc: 'Traces 150 years of Munnar\'s tea heritage with original processing machines' },
      { label: 'Meesapulimala', desc: 'Second highest peak in the Western Ghats at 2,640m with stunting sunrise views' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1597735881932-d9664c9bbcea?w=600&q=80',
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=600&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    ],
  },
  {
    title: 'Beaches & Coastline',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    districts: ['Kovalam', 'Varkala'],
    icon: '🏖️',
    visitors: '43.7L',
    rating: 4.8,
    bestSeason: 'Oct – Feb',
    history: 'Kerala\'s 580 km coastline has been a magnet for maritime traders for over 3,000 years. The Phoenicians, Romans, Arabs, and Chinese all sailed to these shores seeking pepper, cardamom, and cinnamon. Kovalam was "discovered" as a hippie paradise in the 1930s when the Maharaja of Travancore built a palace on its headland. Varkala\'s dramatic laterite cliffs — known as Varkala Formation — are a geological monument dating back to the Cenozoic era (66 million years ago), making them among the oldest rock formations on Earth\'s surface.',
    highlights: [
      { label: 'Muzhappilangad', desc: 'India\'s longest drive-in beach at 4 km — one of only six in the world' },
      { label: 'Kovalam Lighthouse', desc: 'The iconic Vizhinjam lighthouse overlooking three crescent-shaped beaches' },
      { label: 'Marari Beach', desc: 'Named among the top 5 "hammock beaches" in the world by National Geographic' },
      { label: 'Bekal Fort Beach', desc: 'Kerala\'s largest fort (40 acres) overlooking pristine Arabian Sea waters' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
    ],
  },
  {
    title: 'Temples & Festivals',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
    districts: ['Thrissur', 'Guruvayur'],
    icon: '🛕',
    visitors: '31.2L',
    rating: 4.8,
    bestSeason: 'Oct – Mar',
    history: 'Kerala\'s temple tradition spans over 2,000 years, blending Dravidian architecture with unique regional styles. The Padmanabhaswamy Temple in Thiruvananthapuram holds an estimated ₹1 lakh crore in treasures — making it the wealthiest place of worship on Earth. Thrissur Pooram, conceived in 1798 by Raja Rama Varma (Sakthan Thampuran), features 30 caparisoned elephants, thunderous percussion (Panchavadyam), and a fireworks display that lights up the sky for hours. Theyyam — Kerala\'s 1,500-year-old ritual art — transforms performers into living incarnations of gods.',
    highlights: [
      { label: 'Thrissur Pooram', desc: 'Asia\'s grandest temple festival with 36-hour celebrations and 30 elephants' },
      { label: 'Guruvayur Temple', desc: 'The "Dwarka of the South" — receives over 1 crore visitors annually' },
      { label: 'Sabarimala', desc: 'World\'s largest annual pilgrimage — 50 million devotees visit each season' },
      { label: 'Theyyam Rituals', desc: '400+ forms of this ancient ritual art are still performed across North Kerala' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
      'https://images.unsplash.com/photo-1583309219338-a582f1f9ca6b?w=600&q=80',
    ],
  },
  {
    title: 'Wildlife & Forests',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
    districts: ['Periyar', 'Silent Valley'],
    icon: '🐘',
    visitors: '14.7L',
    rating: 4.7,
    bestSeason: 'Oct – May',
    history: 'Kerala is one of the 12 biodiversity hotspots in the world. The Western Ghats harbour over 7,400 species of plants, 139 mammals, 508 birds, and 179 amphibians. Periyar Tiger Reserve, established in 1895 as a game preserve, now protects 35 tigers and over 1,000 elephants across 925 sq km. Silent Valley National Park — saved from a hydroelectric dam project after a historic environmental campaign in the 1970s — contains the last tract of virgin tropical evergreen forest in India, unchanged for 50 million years.',
    highlights: [
      { label: 'Periyar Tiger Reserve', desc: '925 sq km sanctuary with bamboo rafting and elephant encounters' },
      { label: 'Silent Valley', desc: 'One of the last undisturbed tropical rainforests — a living fossil forest' },
      { label: 'Wayanad Wildlife', desc: 'Part of the Nilgiri Biosphere — home to leopards, bears, and rare orchids' },
      { label: 'Chinnar Sanctuary', desc: 'Unique thorny scrubland ecosystem with star tortoises and grizzled giant squirrels' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&q=80',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&q=80',
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=600&q=80',
    ],
  },
  {
    title: 'Food & Culture',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80',
    districts: ['Kozhikode', 'Kochi'],
    icon: '🍛',
    visitors: '44.2L',
    rating: 4.8,
    bestSeason: 'Year-round',
    history: 'Kerala\'s cuisine is a 3,000-year tapestry woven by Arab, Portuguese, Dutch, and British influences. The fabled Spice Route brought traders to Calicut\'s shores, and pepper was once worth its weight in gold — literally called "black gold." The legendary Kerala Sadya (feast) serves 24–28 dishes on a banana leaf, and the Malabar Biryani with its unique short-grain Kaima rice is found nowhere else on Earth. Kochi\'s Jew Town, with its 450-year-old synagogue, and Fort Kochi\'s Chinese fishing nets (cheena vala) — introduced by traders from the court of Kublai Khan — are living testaments to Kerala\'s multicultural identity.',
    highlights: [
      { label: 'Kerala Sadya', desc: '26+ dishes served on a banana leaf — UNESCO-nominated culinary tradition' },
      { label: 'Malabar Biryani', desc: 'Unique Kaima rice biryani cooked in dum style — a Kozhikode original' },
      { label: 'Toddy Shops', desc: 'Traditional palm wine taverns serving spicy Kerala-style seafood and tapioca' },
      { label: 'Kochi-Muziris Biennale', desc: 'India\'s largest contemporary art exhibition transforming Fort Kochi streets' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80',
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=600&q=80',
      'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600&q=80',
    ],
  },
];

export default function ExperiencesGrid() {
  const [selectedExp, setSelectedExp] = useState(null);

  return (
    <section className={styles.section} id="experiences-section">
      <div className={styles.container}>
        <h2 className={styles.title}>Explore by Experience</h2>
        <p className={styles.subtitle}>
          Discover the soul of God&apos;s Own Country through curated journeys, from tranquil waters to untamed jungles.
        </p>

        <div className={styles.grid}>
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.title} {...exp} delay={i * 0.1} onClick={() => setSelectedExp(exp)} />
          ))}
        </div>
      </div>

      <ExperienceModal
        key={selectedExp?.title ?? 'closed'}
        experience={selectedExp}
        onClose={() => setSelectedExp(null)}
      />
    </section>
  );
}
