const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        // path es donde estará la carpeta donde se guardará los archivos
        // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
        path: path.resolve(__dirname, "dist"),
        // filename le pone el nombre al archivo final
        filename: "main.js"
      },
      mode: 'development',
      resolve: {
        // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
        extensions: [".js"]
    },
    //watch: true,
    module: {
        rules: [
          {
            // Test declara que extensión de archivos aplicara el loader
            test: /\.js$/,
            // Use es un arreglo u objeto donde dices que loader aplicaras
            use: {
              loader: "babel-loader",
            },
            // Exclude permite omitir archivos o carpetas especificas
            exclude: /node_modules/
          },
          {
            test:  /\.s?css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/,
            use: ["file-loader"]
          },
          {
            test: /\.png/,
            type: "asset/resource"
          },
          {
            test: /\.(woff|woff2)$/,
            use: {
              loader: "url-loader",
              options: {
                // limit => limite de tamaño
                limit: 10000,
                // Mimetype => tipo de dato
                mimetype: "application/font-woff",
                // name => nombre de salida
                name: "[name].[ext]",
                // outputPath => donde se va a guardar en la carpeta final
                outputPath: "./assets/fonts/",
                publicPath: "./assets/fonts/",
                esModule: false,
              }
            }
          }
        ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      historyApiFallback: true,
      port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
                // Inserta los assets en el documento HTML
          inject: true,
                // Ubicación de tu HTML en el proyecto
          template: "./public/index.html",
                // Nombre y dirección del HTML que se creara al momento de ejecutar webpack
          filename: "./index.html"
        }),
        new CopyPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, "src", "assets/images"),
                to: "assets/images"
              }
            ]
          }),
          new MiniCssExtractPlugin(),  
    ]
}