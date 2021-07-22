const filters = require('./utils/filters.js')
const transforms = require('./utils/transforms.js')
const collections = require('./utils/collections.js')
const now = String(Date.now())

module.exports = function (eleventyConfig) {
    // Folders to copy to build dir (See. 1.1)
    eleventyConfig.addPassthroughCopy("src/static");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("email-templates");

    eleventyConfig.addPassthroughCopy({
        './node_modules/alpinejs/dist/cdn.min.js': './js/alpine.js',
    });

    eleventyConfig.addShortcode('version', function () {
        return now
    });

    eleventyConfig.addShortcode('banner', function (title, options = {}) {
        const {
            image = 'banners/pool-tiles.jpg'
        } = options;
        return `<div class="h-32 lg:h-64 bg-center bg-cover flex items-center justify-center" style="background-image: url('/static/${image}');">
            <h1 class="text-4xl md:text-5xl lg:text-6xl text-white font-bold text-center text-shadow">${ title }</h1>
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
        <form name="employment-application" method="POST" netlify>
            <input type="hidden" value="${jobTitle}">

            <p>(All fields are required to submit the form)</p>

            <p>
                <label class="block" for="first-name">First Name</label>
                <input type="text" id="first-name" name="first-name" value="" class="w-full" required>
            </p>

            <p>
                <label class="block" for="last-name">Last Name</label>
                <input type="text" id="last-name" name="last-name" value="" class="w-full" required>
            </p>

            <p>
                <label class="block" for="phone">Phone</label>
                <input type="tel" id="phone" name="phone" value="" class="w-full" required>
            </p>

            <p>
                <label class="block" for="email">Email Address</label>
                <input type="email" id="email" name="email" value="" class="w-full" required>
            </p>

            <p>
                <input type="submit" value="Send" class="button">
            </p>
        </form>`;
    });



    const { DateTime } = require("luxon");

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('yy-MM-dd');
    });

    eleventyConfig.addFilter("readableDate", dateObj => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat("dd-MM-yy");
    });

    eleventyConfig.addFilter("randomItem", (arr) => {
        arr.sort(() => {
          return 0.5 - Math.random();
        });
        return arr.slice(0, 1);
    });

    eleventyConfig.addFilter("random", function(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    });

    eleventyConfig.addFilter("limit", function (arr, limit) {
        return arr.slice(0, limit);
    });

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