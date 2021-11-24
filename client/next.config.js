const { withPlugins } = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');

// next.js configuration
const nextConfig = {
  env: {
    BACKEND_URL: 'https://localhost:7293/api/',
  },
  webpack: config => {
    config.resolve.modules.push(__dirname);

    config.resolve.alias = {
      ...config.resolve.alias,
    };

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          // limit: false,
          // name: '[name].[ext]'
        }
      }
    })

    return config;
  },
};

module.exports = withPlugins(
  [withCSS, withOptimizedImages, withFonts],
  nextConfig
);
