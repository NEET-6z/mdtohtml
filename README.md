# mdtohtml
自分用

機能

- 自動改行
- 目次
- 数式
- コードブロック色付け
- callout
- markdown内で直接htmlかける

# 使い方
単一のMarkdownファイルを変換

```
mdtohtml -f example.md
```
ディレクトリ内のすべてのMarkdownファイルを変換

```
mdtohtml -d ./examples
```
出力ディレクトリの指定

```
mdtohtml -d ./examples -o ./examples_output
```



```
-f, --file <path>: 特定のMarkdownファイルを指定します。
-d, --directory <path>: ディレクトリ内のすべてのMarkdownファイルを変換します。
-o, --output <path>: 出力ディレクトリを指定します（デフォルトは./output）。
```