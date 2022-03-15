const hljs = require('highlight.js');

/**
 * oth is a class that takes the raw markdown and the rendered markdown and highlights the code using highlightjs
*/
class oth {
    
    #raw: string
    #rendered: string
    listOfCode: string[]
    #codeIndex: number
    listOfLanguages: any

    /**
      * oth is a class that takes the raw markdown and the rendered markdown and highlights the code using highlightjs
      * 
      * @param {string} raw - the unrendered markdown (basically the markdown code before converting it to HTML)
      * @param {string} rendered - the rendered markdown (basically the markdown code converted to HTML by octokit or github's rest api)
    */
    constructor(raw: string, rendered: string) {
        this.#raw = raw
        this.#rendered = rendered
        /**
         * List of the code that was found when running 
        */
        this.listOfCode = []
        this.#codeIndex = 0
        /**
         * lsit of languages that highlightjs supports
        */
        this.listOfLanguages = JSON.parse(JSON.stringify({"1c":true,"abnf":true,"accesslog":true,"actionscript":true,"ada":true,"angelscript":true,"apache":true,"applescript":true,"arcade":true,"arduino":true,"armasm":true,"asciidoc":true,"aspectj":true,"autohotkey":true,"autoit":true,"avrasm":true,"awk":true,"axapta":true,"bash":true,"basic":true,"bnf":true,"brainfuck":true,"c":true,"cal":true,"capnproto":true,"ceylon":true,"clean":true,"clojure-repl":true,"clojure":true,"cmake":true,"coffeescript":true,"coq":true,"cos":true,"cpp":true,"crmsh":true,"crystal":true,"csharp":true,"csp":true,"css":true,"d":true,"dart":true,"delphi":true,"diff":true,"django":true,"dns":true,"dockerfile":true,"dos":true,"dsconfig":true,"dts":true,"dust":true,"ebnf":true,"elixir":true,"elm":true,"erb":true,"erlang-repl":true,"erlang":true,"excel":true,"fix":true,"flix":true,"fortran":true,"fsharp":true,"gams":true,"gauss":true,"gcode":true,"gherkin":true,"glsl":true,"gml":true,"go":true,"golo":true,"gradle":true,"groovy":true,"haml":true,"handlebars":true,"haskell":true,"haxe":true,"hsp":true,"http":true,"hy":true,"inform7":true,"ini":true,"irpf90":true,"isbl":true,"java":true,"javascript":true,"jboss-cli":true,"json":true,"julia-repl":true,"julia":true,"kotlin":true,"lasso":true,"latex":true,"ldif":true,"leaf":true,"less":true,"lisp":true,"livecodeserver":true,"livescript":true,"llvm":true,"lsl":true,"lua":true,"makefile":true,"markdown":true,"mathematica":true,"matlab":true,"maxima":true,"mel":true,"mercury":true,"mipsasm":true,"mizar":true,"mojolicious":true,"monkey":true,"moonscript":true,"n1ql":true,"nestedtext":true,"nginx":true,"nim":true,"nix":true,"node-repl":true,"nsis":true,"objectivec":true,"ocaml":true,"codescad":true,"oxygene":true,"parser3":true,"perl":true,"pf":true,"pgsql":true,"php-template":true,"php":true,"plaintext":true,"pony":true,"powershell":true,"processing":true,"profile":true,"prolog":true,"properties":true,"protobuf":true,"puppet":true,"purebasic":true,"python-repl":true,"python":true,"q":true,"qml":true,"r":true,"reasonml":true,"rib":true,"roboconf":true,"routeros":true,"rsl":true,"ruby":true,"ruleslanguage":true,"rust":true,"sas":true,"scala":true,"scheme":true,"scilab":true,"scss":true,"shell":true,"smali":true,"smalltalk":true,"sml":true,"sqf":true,"sql":true,"stan":true,"stata":true,"step21":true,"stylus":true,"subunit":true,"swift":true,"taggerscript":true,"tap":true,"tcl":true,"thrift":true,"tp":true,"twig":true,"typescript":true,"vala":true,"vbnet":true,"vbscript-html":true,"vbscript":true,"verilog":true,"vhdl":true,"vim":true,"wasm":true,"wren":true,"x86asm":true,"xl":true,"xml":true,"xquery":true,"yaml":true,"zephir":true}))

    }

    /**
     * Looks for code wrapped around ``` or ~~~.
     * 
     * 
     * Can work whether or not you specificy the language after the codeing \`\`\` string. If you do not specify the language or if the language you specify is not supported/not the name highlightjs calls it by (eg: zsh is not supported but bash is), it will run hljs.highlightAuto to determine the language. This is not always accurate
     * 
     * once found, it replaces the github rendered code with highlightjs's rendered code
     * 
     * Then it looks for the \<pre\> tags and adds the 'hljs' class to it
     * 
     * Keep in mind that if you have "\<pre\>" in a sentence, it will mess everything up. If you want to have \<pre\> in a sentence, please use the optimizer function to replace all occurrences of \<pre\> with \\<pre\\>
     * 
     * You can import the optimizer function by including  `import optimizer from "octokit-to-highlightjs/dist/optimizer"` or `var optimizer = require("octokit-to-highlightjs/dist/optimizer")` at the top of your code. Then use it like this: `raw = optimizer(raw)`. Then render it with octokit and finally, use `replaceWithHighlighted()`
     *
    */
    replaceWithHighlighted() {
        this.#findAndHighlight()
        if(this.listOfCode.length === 0){
            throw Error("Either there is no code to highlight or the rendered markdown is not the raw markdown that was supposed to be rendered with octokit. If it is the former, then please make sure the parts you want to highlight is wrapped around ```.")
        }
        var theRenderedMarkdown: string | string[] = this.#rendered
        let tracker = 1

        if(theRenderedMarkdown.includes('class="pl-')){
            theRenderedMarkdown = theRenderedMarkdown.split("pre>")
            while(this.#codeIndex <= this.listOfCode.length){
                theRenderedMarkdown[this.#codeIndex + tracker] = this.listOfCode[this.#codeIndex]
                this.#codeIndex += 1
                tracker += 1
            }
            // for ES2021
            /* theRenderedMarkdown = theRenderedMarkdown.join("pre>").replaceAll("\npre>", "").replaceAll('>pre>', '>') */
            theRenderedMarkdown = theRenderedMarkdown.join("pre>")
        }
        theRenderedMarkdown = theRenderedMarkdown.split(`\npre>`)
        theRenderedMarkdown = theRenderedMarkdown.join("")
        theRenderedMarkdown = theRenderedMarkdown.split(">pre>")
        theRenderedMarkdown = theRenderedMarkdown.join(">")
        theRenderedMarkdown = theRenderedMarkdown.split('<pre>').join('<pre class="hljs">')
        // for ES2021
        /* theRenderedMarkdown = theRenderedMarkdown.replaceAll('<pre>', '<pre class="hljs">') */
        return theRenderedMarkdown
    }

    /**
     * this is the function that actually Looks for code wrapped around ``` or ~~~ in the raw markdown and highlights it. 
     * Before it does that, it looks for the code "pre>" and replaces it with "pre >" so that the fuction "replaceWithHighlighted" does not mess it up when replacing the code with highlightjs's rendered code
     */
    #findAndHighlight() {
        var theRawMarkdown: string | string[] = this.#raw
        let codeStart = 0
        let codeEnd = 3
        let markdown = {}
        let markdownLocatorscounter = 0
    
        while(codeEnd <= theRawMarkdown.length){
            let code = theRawMarkdown.slice(codeStart, codeEnd)
            if((code === '```' || code === '~~~') && markdownLocatorscounter % 2 === 0) {
                markdown[markdownLocatorscounter] = codeEnd
                markdownLocatorscounter += 1
                codeStart += 1
                codeEnd += 1
            } else if((code === '```' || code === '~~~') && markdownLocatorscounter % 2 === 1){
                if(theRawMarkdown[codeStart] === theRawMarkdown[markdown[0] - 1]){
                    markdown[markdownLocatorscounter] = codeStart
                    markdownLocatorscounter += 1
                    codeStart += 1
                    codeEnd += 1
                } else {
                    codeStart += 1
                    codeEnd += 1
                }
            } else {
                codeStart += 1
                codeEnd += 1
            }

            if(Object.values(markdown).length === 2){
                let lastIndex = theRawMarkdown.length - 1
                let excess = theRawMarkdown.slice(markdown[0], lastIndex)
                let newLineLocation = excess.indexOf("\n")
                let codeLanguage = excess.slice(0, newLineLocation).trim()
                let desiredHTML: string | string[] = theRawMarkdown.slice(markdown[0], markdown[1]).replace(codeLanguage, "")
                desiredHTML = desiredHTML.split("\\<pre\\>").join("<pre>")
                
                
                let highLightedHTML = ""
                if(this.listOfLanguages[codeLanguage] === true){
                   highLightedHTML =  hljs.highlight(codeLanguage, desiredHTML).value
                } else {
                    highLightedHTML = hljs.highlightAuto(desiredHTML).value
                }
                this.listOfCode.push(highLightedHTML)
                codeStart += 1
                codeEnd += 1
                delete markdown[0]
                delete markdown[1]
                markdownLocatorscounter = 0
            }
        }
    }
}

export = oth