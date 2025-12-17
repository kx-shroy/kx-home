export interface Challenge {
  subtitle?: string;
  text: string;
}

export interface CaseStudy {
  id: number;
  name: string;
  image: string;
  categories: string[];
  description: string;
  gallery?: string[];
  challenges?: Challenge[];
  workGallery?: string[];
  slug?: string;
}

const casesData: CaseStudy[] = [
  {
    id: 1,
    name: "Sourabh Bothra",
    image: "/assets/archive/cases/sourabh.jpeg",
    categories: ["Health", "Meditation", "Yoga"],
    description: "From yoga science to habit systems, Saurabh empowers people to live healthier. We supported him by crafting clear, actionable content pathways that make wellbeing simple, accessible, and sustainable.",
    slug: "sourabh-bothra"
  },
  {
    id: 2,
    name: "Mayuri Rajput",
    image: "/assets/archive/cases/mayuri.jpeg",
    categories: ["Coaching", "Education", "Career"],
    description: "We helped Mayuri navigate the UK job landscape with clarity and confidence—transforming her ambition into a real opportunity and her journey into a success story.",
    gallery: [
      "/assets/archive/cases/mayuri/img1.JPG",
      "/assets/archive/cases/mayuri/img2.jpeg",
      "/assets/archive/cases/mayuri/img3.jpeg",
      "/assets/archive/cases/mayuri/img4.jpeg",
      "/assets/archive/cases/mayuri/img5.jpeg"
    ],
    challenges: [
      {
        subtitle: "Brand Identity & Visual Coherence",
        text: "Mayuri's profile clearly stated her niche but didn't translate it into connection or credibility. Visually, it lacked consistency and clarity — muted colors, inconsistent fonts, and no highlights to showcase proof or story. Her content focused mainly on career hacks and job tips, performing well on saves but not on depth. Without strong CTAs, storytelling, or community touchpoints, the brand felt more informational than aspirational — limiting trust, engagement, and long-term growth."
      },
      {
        subtitle: "Content Strategy & Audience Alignment",
        text: "Mayuri's content performed best when it was clear, actionable, and addressed real audience pain points — like job struggles or sponsorship tips. However, lifestyle or generic motivational posts lacked utility, felt forced, and failed to engage or convert. The audience valued resource-style content but disengaged when it wasn't framed around learning or tangible takeaways."
      },
      {
        subtitle: "Content Format & Platform Utilization",
        text: "Mayuri's content relied almost entirely on Reels — driving reach but limiting depth and diversity. Carousels, static posts, and stories were underused or unoptimized, missing opportunities for authority building, storytelling, and community engagement. The overdependence on short-form video made the brand informative but one-dimensional, with little space for narrative, connection, or conversion."
      }
    ],
    workGallery: [
      "/assets/archive/cases/mayuri/work/work-1.png",
      "/assets/archive/cases/mayuri/work/work-2.png",
      "/assets/archive/cases/mayuri/work/work-3.png",
      "/assets/archive/cases/mayuri/work/work-4.png",
      "/assets/archive/cases/mayuri/work/work-5.png",
    ],
    slug: "mayuri"
  },
  {
    id: 3,
    name: "Anita Bokepalli",
    image: "/assets/archive/cases/anita.jpg",
    categories: ["Health", "Food", "Yoga"],
    description: "Anita Bokepalli is a certified nutritionist and wellness creator who makes healthy eating simple, practical, and joyful. Through her approachable recipes, ingredient-based tips, and mindful living content, she helps people build a better relationship with food — one meal at a time. Her content focuses on everyday nutrition, smart swaps, and lifestyle balance, making healthy living feel accessible rather than restrictive.",
    gallery: [
      "/assets/archive/cases/anita/img1.jpg",
      "/assets/archive/cases/anita/img4.png",
      "/assets/archive/cases/anita/img3.jpg",
      "/assets/archive/cases/anita/img2.jpg",
      "/assets/archive/cases/anita/img5.jpeg"
    ],
    slug: "anita-bokepalli"
  },
];

export default casesData;
