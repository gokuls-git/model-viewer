import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Not needed unless you want to use it as a plugin.

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
