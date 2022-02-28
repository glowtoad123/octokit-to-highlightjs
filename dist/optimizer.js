"use strict";
/**
 * If you typed \<pre\> is in your raw markdown in a sentence (e.g. If you typed something like: "the tag \<pre\> is used to..."), optimizer will replace all occurrences of \<pre\> with \\<pre\\>.
 * @param {string} raw - the unrendered markdown (basically the markdown code before converting it to HTML)
 */
function optimizer(raw) {
    return raw.split("<pre>").join("\\<pre\\>").split("</pre>").join("\\</pre\\>");
}
module.exports = optimizer;
