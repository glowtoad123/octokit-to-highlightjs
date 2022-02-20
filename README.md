## octokit-to-highlightjs

if you are using github's markdown renderer and want to use highlightjs themes, use this to convert github's/octokit's syntax highlighting method with highlightjs's syntax highlighting method

You must have NodeJS version >= 15 in order to use this.

Here's an example of how you use it

```typescript
// raw is the markdown code and is a string in case you are wondering
let octokitRendered: string = await (await octokit.rest.markdown.render({text: file, mode: "gfm"})).data
    let toHighlight: any = new oth(raw, octokitRendered)
    let highlightedVersion = toHighlight.replaceWithHighlighted()
```
