module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    assets: 'assets',
    'script.js': 'script.js',
    'nav-footer.js': 'nav-footer.js',
    'styles/site.css': 'style.css',
    'styles/tokens.css': 'tokens.css',
    'styles/components.css': 'components.css',
    CNAME: 'CNAME',
    marketing: 'marketing'
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      layouts: '_includes/layouts',
      data: '_data'
    }
  };
};
