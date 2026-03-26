import { contentfulClient } from "./contentful.client";

/**
 * Maps a raw Contentful portfolio entry to a normalized shape
 * that the rest of the app already knows how to consume.
 */
function mapPortfolioEntry(entry: any) {
  const f = entry.fields;
  return {
    _id: entry.sys.id,
    title: f.title || "",
    slug: { current: f.slug || entry.sys.id },
    category: f.category || "",
    description: f.description || f.shortDescription || "",
    client: f.client || "",
    year: f.year || null,
    featured: f.featured || false,
    tags: f.tags || [],
    // mainImage: Contentful asset reference
    mainImage: f.mainImage || null,
    // gallery: array of Contentful asset references
    gallery: f.gallery || [],
    // video: Contentful asset reference (for direct uploads)
    // videoUrl: plain URL string (YouTube / Vimeo / direct external link)
    videoUrl: f.video?.fields?.file?.url 
      ? `https:${f.video.fields.file.url}` 
      : (f.videoUrl || f.externalVideoUrl || null),
    // richText content from Contentful (rich-text field)
    content: f.content || null,
  };
}

/**
 * Fetch ALL portfolio items from Contentful, ordered by creation date desc.
 */
export async function getPortfolioItems() {
  if (!contentfulClient) return [];


  const response = await contentfulClient.getEntries({
    content_type: "portfolio",
    order: ["-sys.createdAt"],
    include: 2, // resolve linked assets (images)
  });

  return response.items.map(mapPortfolioEntry);
}

/**
 * Fetch only featured portfolio items.
 */
export async function getFeaturedPortfolio() {
  if (!contentfulClient) return [];
  const response = await contentfulClient.getEntries({
    content_type: "portfolio",
    "fields.featured": true,
    order: ["-sys.createdAt"],
    include: 2,
  });

  return response.items.map(mapPortfolioEntry);
}

/**
 * Fetch portfolio items filtered by category.
 */
export async function getPortfolioByCategory(category: string) {
  if (!contentfulClient) return [];
  const response = await contentfulClient.getEntries({
    content_type: "portfolio",
    "fields.category": category,
    order: ["-sys.createdAt"],
    include: 2,
  });

  return response.items.map(mapPortfolioEntry);
}

/**
 * Fetch a single portfolio item by its slug field.
 */
export async function getPortfolioBySlug(slug: string) {
  if (!contentfulClient) return null;
  const response = await contentfulClient.getEntries({
    content_type: "portfolio",
    "fields.slug": slug,
    limit: 1,
    include: 2,
  });

  if (response.items.length === 0) return null;
  return mapPortfolioEntry(response.items[0]);
}

/**
 * Fetch site settings from Contentful.
 * Expects a content type called "siteSettings" with the following fields:
 *   - portfolioSectionTitle
 *   - portfolioSectionHeading
 *   - portfolioSectionDescription
 */
export async function getSiteSettings() {
  if (!contentfulClient) return null;
  try {
    const response = await contentfulClient.getEntries({
      content_type: "siteSettings",
      limit: 1,
    });

    if (response.items.length === 0) return null;
    const f = response.items[0].fields as any;
    return {
      portfolioSectionTitle: f.portfolioSectionTitle || null,
      portfolioSectionHeading: f.portfolioSectionHeading || null,
      portfolioSectionDescription: f.portfolioSectionDescription || null,
      heroBackgroundVideo: f.heroBackgroundVideo?.fields?.file?.url 
        ? `https:${f.heroBackgroundVideo.fields.file.url}` 
        : null,
    };
  } catch {
    return null;
  }
}
