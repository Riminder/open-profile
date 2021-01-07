/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    'gatsby-plugin-sass',
    '@bumped-inc/gatsby-plugin-optional-chaining',
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "open-profile",
      },
    },
  ],
  // "rules": {
  //   "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
  //   "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  // },
}
