import { BlogPost } from "./types";

export const posts: BlogPost[] = [
  {
    id: "1",
    title: "How to Use AI to Try Outfits Before You Buy",
    slug: "ai-try-outfits-before-you-buy",
    excerpt:
      "Learn how Outfit AI lets you visualize outfits on yourself in seconds—reducing returns and boosting style confidence.",
    content:
      "Outfit AI helps you preview how clothing will look on you by combining your photo with AI garment visualization. Upload a clear, front-facing image, select garments, add tags like season or formality, and generate results in seconds.",
    image: "/assets/blog/ai-try-outfits.jpg",
    date: "2025-10-01",
    tags: ["AI Fashion", "Shopping", "How-To"],
  },
  {
    id: "2",
    title: "Style Tags That Matter: Get Better AI Outfit Results",
    slug: "style-tags-that-matter",
    excerpt:
      "The right tags lead to the right looks. Here are the most effective tags to guide your AI outfit generations.",
    content:
      "Tags like season, formality, color palette, fit (oversized, tailored), and accessories strongly influence results. Start with 2–3 precise tags and iterate.",
    image: "/assets/blog/style-tags.jpg",
    date: "2025-10-15",
    tags: ["Guides", "Best Practices"],
  },
  {
    id: "3",
    title: "Capsule Wardrobe with AI: Build 10 Looks from 6 Pieces",
    slug: "capsule-wardrobe-with-ai",
    excerpt:
      "Use Outfit AI to quickly mix-and-match essentials into multiple polished looks.",
    content:
      "Start with neutral bottoms, versatile tops, and a statement layer. Generate combinations, then refine by occasion and season tags.",
    image: "/assets/blog/capsule-wardrobe.jpg",
    date: "2025-11-01",
    tags: ["Wardrobe", "Productivity"],
  },
];
