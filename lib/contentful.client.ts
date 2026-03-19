import { createClient } from "contentful";

// Safely initialize the client only if credentials exist
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

export const contentfulClient = (spaceId && accessToken) 
  ? createClient({
      space: spaceId,
      accessToken: accessToken,
      environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
    })
  : null;

/**
 * Helper to get a fully-qualified image URL from a Contentful asset.
 * Contentful asset URLs look like: //images.ctfassets.net/...
 * We prefix with https: to make them absolute.
 */
export function getImageUrl(
  asset: any,
  width?: number,
  height?: number
): string {
  if (!asset) return "";

  // If it's already a full URL string
  if (typeof asset === "string") {
    return asset.startsWith("//") ? `https:${asset}` : asset;
  }

  // Contentful asset object structure: asset.fields.file.url
  const url =
    asset?.fields?.file?.url || asset?.file?.url || "";

  if (!url) return "";

  const base = url.startsWith("//") ? `https:${url}` : url;

  // Append image transformation query params if needed
  const params = new URLSearchParams();
  if (width) params.set("w", String(width));
  if (height) params.set("h", String(height));
  if (width || height) params.set("fit", "fill");

  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

/**
 * Helper to get the alt text from a Contentful asset.
 */
export function getImageAlt(asset: any, fallback = ""): string {
  return (
    asset?.fields?.description ||
    asset?.fields?.title ||
    asset?.description ||
    asset?.title ||
    fallback
  );
}
