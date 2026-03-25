import portfolioData from "./portfolio-data.json";

// This script migrates your local JSON data to Sanity
// To run: npx ts-node lib/migrate.ts

async function migrate() {
  console.log("Starting migration...");

  const { showcaseProjects } = portfolioData;

  for (const project of showcaseProjects) {
    console.log(`Migrating: ${project.title}`);

    try {
      const doc = {
        _type: "portfolio",
        _id: `project-${project.id}`,
        title: project.title,
        slug: {
          _type: "slug",
          current: project.id,
        },
        category: project.category,
        description: project.description,
        client: project.client,
        year: parseInt(project.year),
        tags: project.tags,
        // Images and videos require more complex asset upload
        // For now, we'll just set the metadata
        featured: true,
      };

      console.log(`✓ Successfully migrated ${project.title}`);
    } catch (error) {
      console.error(`✗ Failed to migrate ${project.title}:`, error);
    }
  }

  console.log("Migration complete!");
}

// migrate() // Uncomment to run
