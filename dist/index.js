"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _oth_instances, _oth_raw, _oth_rendered, _oth_codeIndex, _oth_findAndHighlight;
const hljs = require('highlight.js');
/**
 * oth is a class that takes the raw markdown and the rendered markdown and highlights the code using highlightjs
*/
class oth {
    /**
      * oth is a class that takes the raw markdown and the rendered markdown and highlights the code using highlightjs
      *
      * @param {string} raw - the unrendered markdown (basically the markdown code before converting it to HTML)
      * @param {string} rendered - the rendered markdown (basically the markdown code converted to HTML by octokit or github's rest api)
    */
    constructor(
    /**
     * the unrendered markdown (basically the markdown code before converting it to HTML)
     */
    raw, 
    /**
     * the rendered markdown (basically the markdown code converted to HTML by octokit or github's rest api)
     */
    rendered) {
        _oth_instances.add(this);
        _oth_raw.set(this, void 0);
        _oth_rendered.set(this, void 0);
        _oth_codeIndex.set(this, void 0);
        __classPrivateFieldSet(this, _oth_raw, raw, "f");
        __classPrivateFieldSet(this, _oth_rendered, rendered, "f");
        /**
         * List of the code that was found when running
        */
        this.listOfCode = [];
        __classPrivateFieldSet(this, _oth_codeIndex, 0, "f");
        /**
         * lsit of languages that highlightjs supports
        */
        this.listOfLanguages = JSON.parse(JSON.stringify({ "1c": true, "abnf": true, "accesslog": true, "actionscript": true, "ada": true, "angelscript": true, "apache": true, "applescript": true, "arcade": true, "arduino": true, "armasm": true, "asciidoc": true, "aspectj": true, "autohotkey": true, "autoit": true, "avrasm": true, "awk": true, "axapta": true, "bash": true, "basic": true, "bnf": true, "brainfuck": true, "c": true, "cal": true, "capnproto": true, "ceylon": true, "clean": true, "clojure-repl": true, "clojure": true, "cmake": true, "coffeescript": true, "coq": true, "cos": true, "cpp": true, "crmsh": true, "crystal": true, "csharp": true, "csp": true, "css": true, "d": true, "dart": true, "delphi": true, "diff": true, "django": true, "dns": true, "dockerfile": true, "dos": true, "dsconfig": true, "dts": true, "dust": true, "ebnf": true, "elixir": true, "elm": true, "erb": true, "erlang-repl": true, "erlang": true, "excel": true, "fix": true, "flix": true, "fortran": true, "fsharp": true, "gams": true, "gauss": true, "gcode": true, "gherkin": true, "glsl": true, "gml": true, "go": true, "golo": true, "gradle": true, "groovy": true, "haml": true, "handlebars": true, "haskell": true, "haxe": true, "hsp": true, "http": true, "hy": true, "inform7": true, "ini": true, "irpf90": true, "isbl": true, "java": true, "javascript": true, "jboss-cli": true, "json": true, "julia-repl": true, "julia": true, "kotlin": true, "lasso": true, "latex": true, "ldif": true, "leaf": true, "less": true, "lisp": true, "livecodeserver": true, "livescript": true, "llvm": true, "lsl": true, "lua": true, "makefile": true, "markdown": true, "mathematica": true, "matlab": true, "maxima": true, "mel": true, "mercury": true, "mipsasm": true, "mizar": true, "mojolicious": true, "monkey": true, "moonscript": true, "n1ql": true, "nestedtext": true, "nginx": true, "nim": true, "nix": true, "node-repl": true, "nsis": true, "objectivec": true, "ocaml": true, "codescad": true, "oxygene": true, "parser3": true, "perl": true, "pf": true, "pgsql": true, "php-template": true, "php": true, "plaintext": true, "pony": true, "powershell": true, "processing": true, "profile": true, "prolog": true, "properties": true, "protobuf": true, "puppet": true, "purebasic": true, "python-repl": true, "python": true, "q": true, "qml": true, "r": true, "reasonml": true, "rib": true, "roboconf": true, "routeros": true, "rsl": true, "ruby": true, "ruleslanguage": true, "rust": true, "sas": true, "scala": true, "scheme": true, "scilab": true, "scss": true, "shell": true, "smali": true, "smalltalk": true, "sml": true, "sqf": true, "sql": true, "stan": true, "stata": true, "step21": true, "stylus": true, "subunit": true, "swift": true, "taggerscript": true, "tap": true, "tcl": true, "thrift": true, "tp": true, "twig": true, "typescript": true, "vala": true, "vbnet": true, "vbscript-html": true, "vbscript": true, "verilog": true, "vhdl": true, "vim": true, "wasm": true, "wren": true, "x86asm": true, "xl": true, "xml": true, "xquery": true, "yaml": true, "zephir": true }));
    }
    /**
     * Looks for code wrapped around ``` or ~~~. Keep in mind that if ``` is within ~~~ or vice versa, problems may occur.
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
        __classPrivateFieldGet(this, _oth_instances, "m", _oth_findAndHighlight).call(this);
        var theRenderedMarkdown = __classPrivateFieldGet(this, _oth_rendered, "f");
        let tracker = 1;
        if (theRenderedMarkdown.includes('class="pl-')) {
            theRenderedMarkdown = theRenderedMarkdown.split("pre>");
            while (__classPrivateFieldGet(this, _oth_codeIndex, "f") <= this.listOfCode.length) {
                theRenderedMarkdown[__classPrivateFieldGet(this, _oth_codeIndex, "f") + tracker] = this.listOfCode[__classPrivateFieldGet(this, _oth_codeIndex, "f")];
                __classPrivateFieldSet(this, _oth_codeIndex, __classPrivateFieldGet(this, _oth_codeIndex, "f") + 1, "f");
                tracker += 1;
            }
            // for ES2021
            /* theRenderedMarkdown = theRenderedMarkdown.join("pre>").replaceAll("\npre>", "").replaceAll('>pre>', '>') */
            theRenderedMarkdown = theRenderedMarkdown.join("pre>");
        }
        theRenderedMarkdown = theRenderedMarkdown.split(`\npre>`);
        theRenderedMarkdown = theRenderedMarkdown.join("");
        theRenderedMarkdown = theRenderedMarkdown.split(">pre>");
        theRenderedMarkdown = theRenderedMarkdown.join(">");
        console.log("tracker", tracker);
        theRenderedMarkdown = theRenderedMarkdown.split('<pre>').join('<pre class="hljs">');
        // for ES2021
        /* theRenderedMarkdown = theRenderedMarkdown.replaceAll('<pre>', '<pre class="hljs">') */
        return theRenderedMarkdown;
    }
}
_oth_raw = new WeakMap(), _oth_rendered = new WeakMap(), _oth_codeIndex = new WeakMap(), _oth_instances = new WeakSet(), _oth_findAndHighlight = function _oth_findAndHighlight() {
    var theRawMarkdown = __classPrivateFieldGet(this, _oth_raw, "f");
    let codeStart = 0;
    let codeEnd = 3;
    let markdown = {};
    let markdownLocatorscounter = 0;
    while (codeEnd <= theRawMarkdown.length) {
        let code = theRawMarkdown.slice(codeStart, codeEnd);
        if ((code === '```' || code === '~~~') && markdownLocatorscounter % 2 === 0) {
            markdown[markdownLocatorscounter] = codeEnd;
            markdownLocatorscounter += 1;
            codeStart += 1;
            codeEnd += 1;
        }
        else if ((code === '```' || code === '~~~') && markdownLocatorscounter % 2 === 1) {
            markdown[markdownLocatorscounter] = codeStart;
            markdownLocatorscounter += 1;
            codeStart += 1;
            codeEnd += 1;
        }
        else {
            codeStart += 1;
            codeEnd += 1;
        }
        if (Object.values(markdown).length === 2) {
            let lastIndex = theRawMarkdown.length - 1;
            let excess = theRawMarkdown.slice(markdown[0], lastIndex);
            let newLineLocation = excess.indexOf("\n");
            let codeLanguage = excess.slice(0, newLineLocation).trim();
            let desiredHTML = theRawMarkdown.slice(markdown[0], markdown[1]).replace(codeLanguage, "");
            desiredHTML = desiredHTML.split("\\<pre\\>").join("<pre>");
            let highLightedHTML = "";
            if (this.listOfLanguages[codeLanguage] === true) {
                highLightedHTML = hljs.highlight(codeLanguage, desiredHTML).value;
            }
            else {
                highLightedHTML = hljs.highlightAuto(desiredHTML).value;
            }
            this.listOfCode.push(highLightedHTML);
            codeStart += 1;
            codeEnd += 1;
            delete markdown[0];
            delete markdown[1];
            markdownLocatorscounter = 0;
        }
    }
};
module.exports = oth;
