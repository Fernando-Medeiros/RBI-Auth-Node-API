import * as fs from "fs";
import { exec } from "child_process";

const template = (tree: string) => [
  "# STRUCTURE",
  "\n\n",
  "```console",
  "\n\n",
  tree,
  "\n",
  "```",
];

function execTree(): void {
  const COMMAND = "tree --gitignore --dirsfirst";

  exec(COMMAND, (_error, stdout) => {
    const content = template(stdout.toString());

    const toSave = "".concat(...content);

    fs.writeFileSync("./docs/STRUCTURE.md", toSave);
  });
}

execTree();
