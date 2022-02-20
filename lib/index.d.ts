declare const hljs: any;
/**
 * a class that takes the raw markdown and the rendered markdown and highlights the code using highlightjs
 */
declare class oth {
    #private;
    raw: string;
    rendered: string;
    listOfCode: string[];
    listOfLanguages: any;
    constructor(
    /**
     * the unrendered markdown (basically the markdown code before converting it to HTML)
     */
    raw: string, 
    /**
     * the rendered markdown (basically the markdown code converted to HTML by octokit or github's rest api)
     */
    rendered: string);
    /**
     * Looks for code wrapped around ```.
     *
     *
     * Can work whether or not you specificy the language after the opening \`\`\` string. If you do not specify the language or if the language you specify is not supported/not the name highlightjs calls it by (eg: zsh is not supported but bash is), it will run hljs.highlightAuto to determine the language. This is not always accurate
     *
     * once found, it replaces the github rendered code with highlightjs's rendered code
     *
     * Then it looks for the \<pre\> tags and adds the 'hljs' class to it
     *
    */
    replaceWithHighlighted(): string;
}
