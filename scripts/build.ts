import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const srcPath = path.join(__dirname, "..", "src");
const templatesPath = path.join(__dirname, "..", "templates");
const docsPath = path.join(__dirname, "..", "docs");

type List = Array<string | [string, List]>;

class TemplateFiller {
  private _templateContent: string;
  constructor(
    private _templateName: string,
    private _placeholdersGetter: (
      fileNameParts: string[],
      fileContent: string
    ) => Record<string, string>
  ) {
    this._templateContent = readFileSync(
      path.join(templatesPath, _templateName + ".html"),
      {
        encoding: "utf-8",
      }
    );
  }

  get templateName() {
    return this._templateName;
  }

  private addImports(
    placeholders: Record<string, string>,
    fileContent: string
  ) {
    const imports = fileContent
      .split("\n")
      .filter((line) => line.startsWith("import"))
      .map(
        (line) =>
          line
            .match(/"([^"]+)"/)?.[1]
            ?.replace(/\.\.\//g, "")
            .split("/") ?? []
      )
      .map(
        (nameParts) =>
          `<li><a href=${fileNamePartsToHtmlPath(nameParts)}>${toLabelCase(
            nameParts[nameParts.length - 1]
          )}</a></li>`
      );

    placeholders["imports"] =
      imports.length > 0
        ? `<h6>Imports:</h6><ul>${imports.join("\n")}</ul>`
        : "";
  }

  async write(fileNameParts: string[], fileContent: string) {
    let fileData = this._templateContent;
    const placeholders = this._placeholdersGetter(fileNameParts, fileContent);
    this.addImports(placeholders, fileContent);
    Object.entries(placeholders).forEach(([key, value]) => {
      fileData = fileData.replace(`#${key}#`, value);
    });
    writeFileSync(
      path.join(docsPath, fileNameParts.join("_") + ".html"),
      fileData
    );
  }
}

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

      readdirSync(nextParent)
        .filter((child) => !child.endsWith("index.ts"))
        .forEach((child) => {
          queue.push([child, nextParent, nextList]);
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

function fileNamePartsToHtmlPath(fileNameParts: string[]) {
  return `${fileNameParts.join("_")}.html`;
}

function processList(list: List, templateFiller: TemplateFiller): string {
  const listString = [];

  for (const elem of list) {
    if (typeof elem === "string") {
      const fileNameParts = elem
        .replace(srcPath + path.sep, "")
        .replace(/\.ts$/, "")
        .split(path.sep);
      templateFiller.write(
        fileNameParts,
        readFileSync(elem, { encoding: "utf-8" })
      );
      listString.push(
        `<li><a href=${fileNamePartsToHtmlPath(fileNameParts)}>${toLabelCase(
          path.basename(elem, ".ts")
        )}</a></li>`
      );
    } else {
      const subList = processList(elem[1], templateFiller);
      listString.push(
        `<li>${toLabelCase(path.basename(elem[0]))}${subList}</li>`
      );
    }
  }

  return `<ul>
   ${listString.join("\n")}
  </ul>`;
}

const SECTIONS: Array<TemplateFiller> = [
  new TemplateFiller("solutions", (nameParts, content) => {
    const contentLines = content.split("\n");
    const solutionStart = contentLines.findIndex((line) =>
      line.startsWith("function solution")
    );
    const solutionEnd = contentLines.findIndex((line) => line.startsWith("}"));

    return {
      pageTitle: nameParts.map(toLabelCase).reverse().join(" • "),
      title: toLabelCase(nameParts[nameParts.length - 1]),
      link: contentLines[0].replace(/^\/\//, "").trim(),
      solution: contentLines
        .slice(solutionStart, solutionEnd + 1)
        .join("\n")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;"),
    };
  }),
  new TemplateFiller("utils", (nameParts, content) => ({
    pageTitle: nameParts.map(toLabelCase).reverse().join(" • "),
    title: toLabelCase(nameParts[nameParts.length - 1]),
    code: content
      .replace(/import [^\n]+/g, "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .trim(),
  })),
];

(async function build() {
  const sections = await Promise.all(
    SECTIONS.map((section) =>
      getList(path.join(srcPath, section.templateName))
        .then((list) => processList(list, section))
        .then((processedList) => [section.templateName, processedList] as const)
    )
  ).then((res) => Object.fromEntries(res));

  new TemplateFiller("index", () => sections).write(["index"], "");
})();
