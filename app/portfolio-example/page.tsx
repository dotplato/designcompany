import { getPortfolioItems } from "@/lib/contentful.queries";
import { getImageUrl, getImageAlt } from "@/lib/contentful.client";
import Image from "next/image";
import Link from "next/link";

/**
 * Example Portfolio Page Component
 * This demonstrates how to fetch and display Contentful data
 */
export default async function PortfolioExamplePage() {
  // Fetch all portfolio items from Sanity
  const portfolioItems = await getPortfolioItems();

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Portfolio</h1>
        <p className="text-lg text-gray-600">
          Explore our latest design projects
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item: any) => (
          <Link
            key={item._id}
            href={`/portfolio/${item.slug.current}`}
            className="group block"
          >
            <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
              {/* Main Image */}
              {item.mainImage && (
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={getImageUrl(item.mainImage, 600, 400)}
                    alt={getImageAlt(item.mainImage, item.title)}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Featured Badge */}
                  {item.featured && (
                    <span className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-2">
                  {item.category}
                </span>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h2>

                {/* Description */}
                {item.description && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.description}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  {item.client && (
                    <span className="font-medium">{item.client}</span>
                  )}
                  {item.year && <span>{item.year}</span>}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {portfolioItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No portfolio items found. Add some in Contentful!
          </p>
          <a
            href="https://app.contentful.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open Contentful
          </a>
        </div>
      )}
    </div>
  );
}

/**
 * Enable Incremental Static Regeneration
 * This will revalidate the page every 60 seconds
 */
export const revalidate = 60;
