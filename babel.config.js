module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-typescript",
    ],
    plugins: [
      [
        "babel-plugin-macros",
        {
          // add this line to your config
          "typed-redux-saga": {},
        },
      ],
    ],
  };
};