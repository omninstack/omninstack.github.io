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

  eleventyConfig.addFilter('dateIso', (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return d.toISOString().slice(0, 10);
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
