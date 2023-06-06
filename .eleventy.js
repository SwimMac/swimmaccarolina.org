const filters = require('./utils/filters.js');
const transforms = require('./utils/transforms.js');
const collections = require('./utils/collections.js');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const now = String(Date.now());

module.exports = function (eleventyConfig) {
    // Folders to copy to build dir (See. 1.1)
    eleventyConfig.addPassthroughCopy("src/static");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("email-templates");

    eleventyConfig.addPassthroughCopy({
        './node_modules/alpinejs/dist/cdn.min.js': './js/alpine.js',
    });

    // Get only content that matches a tag
    eleventyConfig.addCollection("staffOrder", function(collectionApi) {
        return collectionApi.getFilteredByTag("staff").sort(function(a, b) {
            //return a.date - b.date; // sort by date - ascending
            return a.data.order - b.data.order; // sort by date - descending
            //return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
            //return b.inputPath.localeCompare(a.inputPath); // sort by path - descending
        });
    });

    // Get only content that matches a tag
    eleventyConfig.addCollection("staffAlphabetical", function(collectionApi) {
        return collectionApi.getFilteredByTag("staff").sort(function(a, b) {
            //return a.date - b.date; // sort by date - ascending
            //return b.date - a.date; // sort by date - descending
            return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
            //return b.inputPath.localeCompare(a.inputPath); // sort by path - descending
        });
    });

    eleventyConfig.addShortcode('version', function () {
        return now
    });

    eleventyConfig.addShortcode('banner', function (title, options = {}) {
        const {
            image = 'pool-tiles.jpg'
        } = options;
        return `<div class="h-32 lg:h-64 bg-center bg-cover flex items-center justify-center" style="background-image: url('/static/banners/${image}');">
            <h1 class="text-4xl md:text-5xl lg:text-6xl text-white font-bold text-center text-shadow">${ title }</h1>
        </div>`;
    });

    eleventyConfig.addShortcode('compTryoutLink', function () {
        return `<div class="my-16 text-center">
        <h2>Schedule a Tryout</h2>

        <a href="https://www.teamunify.com/team/ncmac/page/our-team/tryouts" class="button" target="_blank">
           Schedule a Tryout on Team Unify
        </a>
     </div>`;
    });

    eleventyConfig.addShortcode('coachContact', function (coachName, coachEmail ) {
        return `<div class="text-center">
            <h2 class="separator-center">Questions?</h2>
            <h4>${coachName}</h4>
            <p><a href="mailto:${coachEmail}">${coachEmail}</a></p>
        </div>`;
    });

    eleventyConfig.addShortcode('employeeApplicationForm', function ( jobTitle ) {
        return `<h3>Think you'd be a great fit?</h3>
        <p>Send us your information and we'll have our hiring manager contact you.</p>
        <form name="employment-application" class="employment-form" method="POST" netlify>
            <input type="hidden" name="job-title" value="${jobTitle}">

            <p>(<span class="text-red-500">*</span> Required to submit the form)</p>

            <p>
                <label class="block" for="first-name"><span class="text-red-500">*</span>First Name</label>
                <input type="text" id="first-name" name="first-name" value="" class="w-full" required>
            </p>

            <p>
                <label class="block" for="last-name"><span class="text-red-500">*</span>Last Name</label>
                <input type="text" id="last-name" name="last-name" value="" class="w-full" required>
            </p>

            <p>
                <label class="block" for="phone"><span class="text-red-500">*</span>Phone</label>
                <input type="tel" id="phone" name="phone" value="" class="w-full" required>
            </p>

            <p>
                <label class="block" for="email"><span class="text-red-500">*</span>Email Address</label>
                <input type="email" id="email" name="email" value="" class="w-full" required>
            </p>

            <p>
                <label class="block" for="resume">Upload Your Resume (optional)</label>
                <input type="file" id="resume" name="resume" class="w-full">
            </p>

            <p>
                <input type="submit" value="Send" class="button">
            </p>
        </form>`;
    });

    module.exports = function (date, part) {
        var d = new Date(date);
        if (part == 'year') {
          return d.getUTCFullYear();
        }
        var month = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        var ordinal = {
          1: "st",
          2: "nd",
          3: "rd",
          21: "st",
          22: "nd",
          23: "rd",
          31: "st"
        };
        return month[d.getMonth()] + " " + d.getDate() + (ordinal[d.getDate()] || "th") + ", " + d.getUTCFullYear();
    };

    // RSS Feed
    eleventyConfig.addPlugin(pluginRss);

    /*
    A simple ISO timestamp for Nunjucks
    */
    module.exports = function (date) {
        let timestamp = new Date();
        const result = timestamp.toISOString();
        return result;
    };

    // Filters
    Object.keys(filters).forEach((filterName) => {
        eleventyConfig.addFilter(filterName, filters[filterName])
    });

    // Transforms
    Object.keys(transforms).forEach((transformName) => {
        eleventyConfig.addTransform(transformName, transforms[transformName])
    });

    // Collections
    Object.keys(collections).forEach((collectionName) => {
        eleventyConfig.addCollection(collectionName, collections[collectionName])
    });

    // This allows Eleventy to watch for file changes during local development.
    eleventyConfig.setUseGitIgnore(false);

    return {
        dir: {
            input: "src/",
            output: "dist",
            includes: "_includes",
            layouts: "_layouts"
        },
        templateFormats: ["html", "md", "njk"],
        htmlTemplateEngine: "njk",

        // 1.1 Enable eleventy to pass dirs specified above
        passthroughFileCopy: true
    };
};