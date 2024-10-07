#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import path from "path";
import { MarkdownToHtml } from "./mdtohtml.js";

const program = new Command();

program
  .version("1.0.0")
  .description("MarkdownファイルをHTMLに変換します")
  .option("-f, --file <path>", "特定のMarkdownファイルを変換")
  .option(
    "-d, --directory <path>",
    "ディレクトリ内のすべてのMarkdownファイルを変換"
  )
  .option("-o, --output <path>", "出力ディレクトリを指定", "./output")
  .parse(process.argv);

const options = program.opts();

(async () => {
  if (options.file) {
    const outputDir = process.cwd();
    const filePath = path.resolve(process.cwd(), options.file);
    if (!fs.existsSync(filePath)) {
      console.error(`エラー: ファイル ${filePath} は存在しません。`);
      process.exit(1);
    }

    const markdownContent = fs.readFileSync(filePath, "utf8");
    const htmlContent = await MarkdownToHtml(markdownContent);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFilePath = path.join(
      outputDir,
      path.basename(filePath, ".md") + ".html"
    );
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log(`変換しました: ${filePath} -> ${outputFilePath}`);
  } else if (options.directory) {
    const outputDir = path.resolve(process.cwd(), options.output);
    const dirPath = path.resolve(process.cwd(), options.directory);
    if (!fs.existsSync(dirPath)) {
      console.error(`エラー: ディレクトリ ${dirPath} は存在しません。`);
      process.exit(1);
    }

    const files = fs
      .readdirSync(dirPath)
      .filter((file) => file.endsWith(".md"));
    if (files.length === 0) {
      console.log(
        `ディレクトリ ${dirPath} にMarkdownファイルが見つかりません。`
      );
      process.exit(0);
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const markdownContent = fs.readFileSync(filePath, "utf8");
      const htmlContent = await MarkdownToHtml(markdownContent);

      const outputFilePath = path.join(outputDir, file.replace(".md", ".html"));
      fs.writeFileSync(outputFilePath, htmlContent);
      console.log(`変換しました: ${filePath} -> ${outputFilePath}`);
    }
  } else {
    console.log("ファイルまたはディレクトリのいずれかを指定してください。");
    program.help();
  }
})();
