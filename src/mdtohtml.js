import rehypeKatex from "rehype-katex";
import { rehypePrettyCode } from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkBreaks from "remark-breaks";
import remarkCallouts from "remark-callouts";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";
import { unified } from "unified";

export async function MarkdownToHtml(content) {
  const html = await unified()
    .use(remarkParse) // markdown -> mdast の変換
    .use(remarkBreaks)
    .use(remarkCallouts)
    .use(remarkRehype, { allowDangerousHtml: true }) // mdast -> hast の変換
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkToc, { heading: "目次", maxDepth: 3 })
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      theme: "one-dark-pro",
      keepBackground: true,
    })
    .use(rehypeStringify, { allowDangerousHtml: true }) // hast -> html の変換
    .process(content);

  const cssLink = `
<link rel="stylesheet" href="./styles/callouts.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
<style>
  table {
    border-collapse: collapse;
    margin: 20px 0;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  blockquote {
    background-color: #f9f9f9;
    border-left: 5px solid #007bff;
    padding: 10px 20px;
    margin: 0 0 20px 0;
  }
  blockquote p {
    margin: 0;
  }
  pre {
    background-color: #1E1E1E;
    color: #D4D4D4;
    font-size: 14px;
    overflow: auto;
    padding: 10px;
  }
</style>
`;

  const strHtml = html.toString();

  return strHtml + `\n${cssLink}\n`;
}
