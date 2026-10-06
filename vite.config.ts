import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [tailwindcss()],


  "build": {
    "rolldownOptions": {
      "input": {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname,'deshboard.html'),
        edit:resolve (__dirname,'edit.html'),
        cart:resolve (__dirname,'cart.html')
      }
    }
  },

  server: {
    watch: {
      ignored: ["**/db.json"],
    },
  },
});