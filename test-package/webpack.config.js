const path = require("path")
const MyCsslWebpackPlugin = require("my-css-webpack-plugin")


const joinPath = (mypath) => path.join(__dirname, mypath)

const wconfig = {
   
   mode: "development",
   devtool: false,
   watch: true,

   entry: joinPath("src/js/index.js"),

   output: {
      path: joinPath("dist/js"),
      filename: "index.js"
   },

   plugins: [
      new MyCsslWebpackPlugin({

         entry: {
            style: {
               filePathName: joinPath("src/css/style.css"),
               outputFilename: "style.css"
            },
            main: {
               filePathName: joinPath("src/css/main.css"),
               outputFilename: "main.css"
            }
         },

         minify: true,
         
         output: {
            path: joinPath("dist/css")
         }
      })
   ],

   resolve: {
      extensions: [".js"],
   }
}

module.exports = wconfig

