!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o=e();for(var i in o)("object"==typeof exports?exports:t)[i]=o[i]}}(global,(function(){return function(){"use strict";var t={473:function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(){}return t.error=function(t,e){console.log("[31m[1m","".concat(t," Exception:\n"),String(e),"[0m")},t}();e.default=o},665:function(t,e,o){var i=this&&this.__read||function(t,e){var o="function"==typeof Symbol&&t[Symbol.iterator];if(!o)return t;var i,n,r=o.call(t),s=[];try{for(;(void 0===e||e-- >0)&&!(i=r.next()).done;)s.push(i.value)}catch(t){n={error:t}}finally{try{i&&!i.done&&(o=r.return)&&o.call(r)}finally{if(n)throw n.error}}return s},n=this&&this.__spreadArray||function(t,e,o){if(o||2===arguments.length)for(var i,n=0,r=e.length;n<r;n++)!i&&n in e||(i||(i=Array.prototype.slice.call(e,0,n)),i[n]=e[n]);return t.concat(i||Array.prototype.slice.call(e))},r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var s=r(o(147)),a=r(o(17)),u=o(354),l=r(o(293)),f=r(o(959)),c=r(o(473)),p=function(){function t(t){var e=this;this.name="MyCssWebpackPlugin",this.filePathNameCache=new Set,this.handleCompilationAssets=function(t,o){e.handleExternalCssFiles(t,o)},this.options=t}return t.prototype.apply=function(t){var e=this;t.hooks.compilation.tap(this.name,(function(o){o.hooks.processAssets.tap({name:e.name,stage:u.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE},(function(){return e.handleCompilationAssets(t,o)}))}))},t.prototype.handleExternalCssFiles=function(t,e){var o=this,i=this.getFileModifiedFile(t);if(this.options.output&&this.options.output.path)if(!i||i.match(/(\.css|\.scss)$/)){var n=void 0===this.options.minify?"production"===t.options.mode:Boolean(this.options.minify),r=new l.default({className:this.name,pattern:"@?import"});for(var s in this.options.entry){var a=this.options.entry[s],u=r.bundle(a.filePathName),p=u.source,d=u.filePathNames;p=f.default.compileString(p,{style:n?"compressed":"expanded"}).css,d.forEach((function(t){o.filePathNameCache.add(t),e.fileDependencies.add(t)})),this.output(this.options.output.path,a.outputFilename,p)}}else this.filePathNameCache.forEach((function(t){return e.fileDependencies.add(t)}));else c.default.error(this.name,"the output path is missing.")},t.prototype.output=function(t,e,o){try{s.default.existsSync(t)||s.default.mkdirSync(t),s.default.writeFileSync(a.default.join(t,e),o)}catch(t){var i=t;c.default.error(this.name,i)}},t.prototype.getFileModifiedFile=function(t){var e=t.modifiedFiles;return e&&n([],i(e),!1)[0]||null},t}();e.default=p},293:function(t){t.exports=require("file-bundler")},959:function(t){t.exports=require("sass")},354:function(t){t.exports=require("webpack")},147:function(t){t.exports=require("fs")},17:function(t){t.exports=require("path")}},e={},o=function o(i){var n=e[i];if(void 0!==n)return n.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,o),r.exports}(665);return o.default}()}));