module.exports = {
  plugins: [
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Comfortaa', 'Orbitron', 'Fira Mono', 'Raleway']
        }
      }
    },
    'gatsby-plugin-react-leaflet'
  ]
};
