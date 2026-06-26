import rss from "@astrojs/rss";
import { SITE } from "../config";
import { getCollection } from "astro:content";

export async function GET() {
  const projects = await getCollection("projects");
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.url,
    items: projects
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((p) => ({
        title: p.data.title,
        description: p.data.subtitle,
        link: `/projects/${p.id}`,
        pubDate: p.data.date,
      })),
  });
}
