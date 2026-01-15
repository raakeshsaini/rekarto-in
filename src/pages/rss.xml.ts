import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import fs from "fs";
import path from "path";

export async function GET() {
  const site = "https://rekarto.in";

  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime()
  );

  return rss({
    title: "ReKarto Blog",
    description:
      "Insights on thrift business, offline retail & distribution systems.",
    site,

    items: posts.map((post) => {
      const imagePath = post.data.image;
      let enclosure;

      if (imagePath) {
        const filePath = path.join(
          process.cwd(),
          "public",
          imagePath.replace(/^\/+/, "")
        );

        let size = 0;
        try {
          size = fs.statSync(filePath).size;
        } catch {
          // file missing → skip enclosure safely
        }

        enclosure = {
          url: site + imagePath,
          length: size,
          type: "image/webp",
        };
      }

      return {
        title: post.data.title,
        description: post.data.description,
        link: `/blog/${post.slug}`,
        pubDate: post.data.publishDate,
        enclosure,
      };
    }),
  });
}
