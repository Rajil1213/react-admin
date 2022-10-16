//default webpack config
const webpack = require("webpack");

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  
//for exporting the environment variables from docker compose file to React app
plugins:[
    new webpack.DefinePlugin({
      "BACKEND_URL": JSON.stringify(process.env.REACT_APP_BACKEND_URL),
    })
  ]
};

export default module.exports.plugins;