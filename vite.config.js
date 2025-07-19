import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace 'your-username/your-repo' with your actual GitHub repo name
export default defineConfig({
  base: "/water-plants/",
  plugins: [react()],
  test: {
    environment: "node",
  },
});
