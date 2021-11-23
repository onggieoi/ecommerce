module.exports = function(api) {
  api.cache(true);

  const presets = ['next/babel'];
  const plugins = [
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: true,
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
  ];

  return {
    presets,
    plugins,
  };
};
