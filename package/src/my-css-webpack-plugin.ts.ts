import fs from "fs"
import path from "path"
import { Compiler, Compilation } from "webpack"
import FileBundler from "file-bundler"
import sass from "sass"
import Logger from "./logger"

type __my_css_webpack_plugin_options = {

   entry: {
      [k: string]: {
         filePathName: string
         outputFilename: string
      }
   }
   
   /** defaults to auto when it's undefined*/
   minify?: boolean

   output: {
      path: string
   }
}

export default class MyCssWebpackPlugin {
   private name = "MyCssWebpackPlugin"
   private filePathNameCache = new Set<string>()
   private options

   constructor(options: __my_css_webpack_plugin_options) {
      this.options = options
   }

   public apply(compiler: Compiler) {
      
      compiler.hooks.compilation.tap(this.name, (compilation) => {
         compilation.hooks.processAssets.tap(
            {name: this.name, stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE},
            () => this.handleCompilationAssets(compiler, compilation)
         )
      })
   }

   private handleExternalCssFiles(compiler: Compiler, compilation: Compilation) {
      
      const modifiedFile = this.getFileModifiedFile(compiler)

      if (!this.options.output || !this.options.output.path) {
         Logger.error(this.name, `the output path is missing.`)
         return
      }

      if (modifiedFile && !modifiedFile.match(/(\.css|\.scss)$/)) {
         this.filePathNameCache.forEach(filename => compilation.fileDependencies.add(filename))
         // console.log("donnot bundle css and keep watching")
         return
      }

      const minify = this.options.minify === undefined ? compiler.options.mode === "production" : Boolean(this.options.minify)

      const fileBundler = new FileBundler({
         className: this.name,
         pattern: "@?import"
      })

      for (const key in this.options.entry) {
         const target = this.options.entry[key]
         
         let { source, filePathNames } = fileBundler.bundle(target.filePathName)
   
         source = sass.compileString(source, {
            style: minify ? "compressed" : "expanded"
         }).css
         
         filePathNames.forEach(filePathName => {
            this.filePathNameCache.add(filePathName)
            compilation.fileDependencies.add(filePathName)
         })
         
         
         this.output(this.options.output.path, target.outputFilename, source)
      }
   }
   
   private output(pathname: string, filename: string, string: string) {
      try {
         const filePathName = path.resolve(pathname, filename.replace(/^[\\\/]/g, ""))

         const directory = path.dirname(filePathName)

         const relativePathname = path.relative(process.cwd(), directory)
         
         if (!fs.existsSync(relativePathname)) {
            fs.mkdirSync(relativePathname, { recursive: true })
         }

         fs.writeFileSync(filePathName, string)
      } catch (e) {
         const error = e as Error
         Logger.error(this.name, error)
      }
   }

   private handleCompilationAssets = (compiler: Compiler, compilation: Compilation) => {
      this.handleExternalCssFiles(compiler, compilation)
   }

   private getFileModifiedFile(compiler: Compiler) {
      const modifiedFiles = compiler.modifiedFiles
      if (!modifiedFiles) return null
      return [...modifiedFiles][0] || null
   }
}