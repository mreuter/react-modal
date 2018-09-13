module.exports = function babelConfig(api) {
  api.cache(false);

  return {
    presets: ['@babel/env', '@babel/flow', '@babel/react'],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
    ],
  };
};
