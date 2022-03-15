/**
 * oth is a class that takes the raw markdown and the rendered markdown and highlights the code using highlightjs
*/
declare class oth {
    #private;
    listOfCode: string[];
    listOfLanguages: any;
    /**
      * oth is a class that takes the raw markdown and the rendered markdown and highlights the code using highlightjs
      *
      * @param {string} raw - the unrendered markdown (basically the markdown code before converting it to HTML)
      * @param {string} rendered - the rendered markdown (basically the markdown code converted to HTML by octokit or github's rest api)
    */
    constructor(raw: string, rendered: string);
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
    replaceWithHighlighted(): string;
}
export = oth;
