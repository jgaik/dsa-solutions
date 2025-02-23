import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const srcPath = path.join(__dirname, "..", "src");
const templatesPath = path.join(__dirname, "..", "templates");
const docsPath = path.join(__dirname, "..", "docs");

type List = Array<string | [string, List]>;

async function getList(startPath: string) {
  const out: List = [];

  const queue: Array<[string, string, List]> = [[startPath, "", out]];

  while (queue.length > 0) {
    const [curr, parent, list] = queue.shift()!;
    const nextParent = path.join(parent, curr);

    if (nextParent.endsWith(".ts")) {
      list.push(nextParent);
    } else {
      const nextList: List = [];
      list.push([nextParent, nextList]);

      await readdir(nextParent).then((children) => {
        children
          .filter((child) => !child.endsWith("index.ts"))
          .forEach((child) => {
            queue.push([child, nextParent, nextList]);
          });
      });
    }
  }

  return out[0][1] as List;
}

function toLabelCase(text: string) {
  return text.replace(/(^\w|-\w)/g, (match) =>
    match.replace(/-/, " ").toUpperCase()
  );
}

function filePathToHtmlPath(filePath: string) {
  return filePath
    .replace(srcPath + path.sep, "")
    .replace(new RegExp(path.sep, "g"), "__")
    .replace(/\.ts$/, ".html");
}

async function processList(
  list: List,
  prepareFileContent: (filePath: string) => Promise<void>
): Promise<string> {
  const listString = [];

  for (const elem of list) {
    if (typeof elem === "string") {
      await prepareFileContent(elem);
      listString.push(
        `<li><a href=${filePathToHtmlPath(elem)}>${toLabelCase(
          path.basename(elem, ".ts")
        )}</a></li>`
      );
    } else {
      const subList = await processList(elem[1], prepareFileContent);
      listString.push(
        `<li>${toLabelCase(path.basename(elem[0]))}${subList}</li>`
      );
    }
  }

  return `<ul>
   ${listString.join("\n")}
  </ul>`;
}

async function prepareSolutionsFile(filePath: string) {
  const contentLines = await readFile(filePath, { encoding: "utf-8" }).then(
    (content) => content.split("\n")
  );

  const solutionStart = contentLines.findIndex((line) =>
    line.startsWith("function solution")
  );
  const solutionEnd = contentLines.findIndex((line) => line.startsWith("}"));

  const meta = {
    pageTitle: filePath
      .replace(srcPath + path.sep, "")
      .replace(/\.ts$/, "")
      .split(path.sep)
      .map(toLabelCase)
      .reverse()
      .join(" • "),

    title: toLabelCase(path.basename(filePath, ".ts")),
    link: contentLines[0].replace(/^\/\//, "").trim(),
    solution: contentLines
      .slice(solutionStart, solutionEnd + 1)
      .join("\n")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;"),
  };

  const solutionTemplate = await readFile(
    path.join(templatesPath, "solutions.html"),
    { encoding: "utf-8" }
  ).then((content) => {
    Object.entries(meta).forEach(([key, value]) => {
      content = content.replace(`#${key}#`, value);
    });
    return content;
  });

  await writeFile(
    path.join(docsPath, filePathToHtmlPath(filePath)),
    solutionTemplate
  );
}

async function prepareUtilsFile(filePath: string) {
  const code = await readFile(filePath, { encoding: "utf-8" });

  const meta = {
    pageTitle: filePath
      .replace(srcPath + path.sep, "")
      .replace(/\.ts$/, "")
      .split(path.sep)
      .map(toLabelCase)
      .reverse()
      .join(" • "),

    title: toLabelCase(path.basename(filePath, ".ts")),
    code,
  };

  const utilsTemplate = await readFile(path.join(templatesPath, "utils.html"), {
    encoding: "utf-8",
  }).then((content) => {
    Object.entries(meta).forEach(([key, value]) => {
      content = content.replace(`#${key}#`, value);
    });
    return content;
  });

  await writeFile(
    path.join(docsPath, filePathToHtmlPath(filePath)),
    utilsTemplate
  );
}

(async function build() {
  const solutions = await getList(path.join(srcPath, "solutions")).then(
    (list) => processList(list, prepareSolutionsFile)
  );
  const utils = await getList(path.join(srcPath, "utils")).then((list) =>
    processList(list, prepareUtilsFile)
  );

  const templatesIndex = await readFile(
    path.join(templatesPath, "index.html"),
    {
      encoding: "utf-8",
    }
  ).then((content) =>
    content.replace("#solutions#", solutions).replace("#utils#", utils)
  );

  await writeFile(path.join(docsPath, "index.html"), templatesIndex);
})();
