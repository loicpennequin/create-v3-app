module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano'),
    require('postcss-jit-props')(require('open-props'))
  ]
};
