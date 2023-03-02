module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano'),
    require('postcss-scrollbar'),
    require('postcss-jit-props')(require('open-props')),
    require('postcss-nesting')({ noIsPseudoSelector: false }),
    require('postcss-custom-media')({ preserve: false })
  ]
};
