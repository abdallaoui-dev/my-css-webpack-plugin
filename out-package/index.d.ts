import { Compiler } from "webpack";
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

declare class MyCssWebpackPlugin {
   private options;
   constructor(options: __my_css_webpack_plugin_options);
   apply(compiler: Compiler): void;
}
export = MyCssWebpackPlugin
