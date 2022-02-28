## octokit-to-highlightjs

if you are using github's markdown renderer and want to use highlightjs themes, use this to convert github's/octokit's syntax highlighting method with highlightjs's syntax highlighting method

Here's an example of how you use it

```typescript
// importing
var oth = require("octokit-to-highlightjs")
// only if your raw markdown uses `<pre>` in a sentence (e.g. If you typed something like: "the tag <pre> is used to...")
var optimizer = require("octokit-to-highlightjs/dist/optimizer")


// raw is the markdown code and is a string in case you are wondering

// use optimizer only if your raw markdown uses `<pre>` in a sentence (e.g. If you typed something like: "the tag <pre> is used to...")
raw = optimizer(raw)

let octokitRendered: string = await (await octokit.rest.markdown.render({text: raw, mode: "markdown"})).data
    let toHighlight: any = new oth(raw, octokitRendered)
    let highlightedVersion = toHighlight.replaceWithHighlighted()
```

Keep in mind that if ``` is within ~~~ or vice versa, problems may occur.