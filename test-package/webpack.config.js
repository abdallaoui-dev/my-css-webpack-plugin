const path = require("path")
const MyCsslWebpackPlugin = require("my-css-webpack-plugin")
const MyHtmlWebpackPlugin = require("my-html-webpack-plugin")


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
               outputFilename: "desktop/style.css"
            },
            main: {
               filePathName: joinPath("src/css/main.css"),
               outputFilename: "main.css"
            }
         },

         minify: false,
         
         output: {
            path: joinPath("dist/css")
         }
      }),
      
      new MyHtmlWebpackPlugin({

         entry: {
            index: {
               filePathName: joinPath("src/html/index.html"),
               outputFilename: "index.html"
            }
         },

         output: {
            path: joinPath("dist"),
            exclude: joinPath("src/html/templates")
         },

         jsSource: {
            rootDir: joinPath("src/"),
            watchFilePathNames: true
         },

         includeProperties: {
            title: "my website title"
         }
      })
   ],

   resolve: {
      extensions: [".js"],
   }
}

module.exports = wconfig

