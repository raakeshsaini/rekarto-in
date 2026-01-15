import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("blog");
  const site = "https://rekarto.in";

  const urls = posts
    .filter((post) => post.data.image)
    .map((post) => {
      const imageUrl = site + post.data.image;
      const lastmod = post.data.publishDate
        .toISOString()
        .split("T")[0];

      return `
  <url>
    <loc>${site}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
<image:image>
  <image:loc>${imageUrl}</image:loc>
  <image:title><![CDATA[${post.data.title}]]></image:title>
  <image:caption><![CDATA[${post.data.imageAlt}]]></image:caption>
</image:image>

  </url>`;
    })
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
