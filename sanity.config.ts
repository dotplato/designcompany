import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";

export default defineConfig({
  name: "default",
  title: "Design Company Studio",

  projectId:
    process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset:
    process.env.SANITY_STUDIO_DATASET || "",

  basePath: "/admin",

  plugins: [deskTool(), visionTool()],

 
});
