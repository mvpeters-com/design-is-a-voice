import Home from "@/components/Home";
import { getPayload } from "payload";
import config from "@/payload.config";
import type { Poster, Media } from "@/payload-types";

async function getPosters() {
  try {
    const payload = await getPayload({ config });

    const { docs: posters } = await payload.find({
      collection: "posters",
      depth: 2, // This will populate the poster relationship with media data
    });

    return posters as (Poster & { poster: Media })[];
  } catch (error) {
    console.error("Error fetching posters:", error);
    return [];
  }
}

export default async function HomePage() {
  const posters = await getPosters();
  return <Home posters={posters} />;
}