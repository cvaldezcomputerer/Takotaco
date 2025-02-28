const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Passthrough file copy
  eleventyConfig.addPassthroughCopy("./www/css");
  eleventyConfig.addPassthroughCopy("./www/js");
  eleventyConfig.addPassthroughCopy("./www/images");
  eleventyConfig.addPassthroughCopy("./www/audio");

  // Add a filter to format dates
  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // Create a collection for blog posts
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  return {
    dir: {
      input: "src",
      output: "../www/blog", // Output to the blog directory in the existing website
      includes: "src/_includes",
      layouts: "_includes/layouts",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
