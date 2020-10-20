const path = require('path');

const { override, fixBabelImports, removeModuleScopePlugin, addLessLoader } = require('customize-cra');

module.exports = override (
  removeModuleScopePlugin(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "@primary-color": "#f48549", // customize as needed
        "@link-color": "#e6a07c", // customize as needed
        "@font-size-base": "18px", // customize as needed
      },
    },
  }),
  (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      include: path.join(__dirname, "node_modules"),
      enforce: "pre",
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      ],
    });

    return config;
  }
)
