const sveltePreprocess = require("svelte-preprocess")
const static = require("@sveltejs/adapter-static")
const pkg = require("./package.json")

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess(),
  kit: {
    adapter: static(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",

    paths: {
      base: process.env.NODE_ENV === "production" ? process.env.BASE || "/" : "/",
    },

    vite: {
      ssr: {
        noExternal: process.env.NODE_ENV === "production" ? Object.keys(pkg.dependencies || {}) : [],
      },
      define: {
        "process.browser": true,
      },
    },
  },
}
