import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { window } from "vscode";
import { camelCase } from "../utils/camel-case";

function pageTemplate(camelCaseName: string) {
  return `import React from 'react';

const ${camelCaseName}: React.FC = () => {
  return (
    <div>
      ${camelCaseName}
    </div>
  );
};

export default ${camelCaseName};`;
}

export async function createPage(dirPath: string) {
  const pageName = await window.showInputBox({
    placeHolder: 'please input page name',
    prompt: 'page-name',
    validateInput: (value: string) => {
      if (!value) {
        return 'page name is required';
      }
      const reg = /^[a-zA-Z-]+$/;
      if (!reg.test(value)) {
        return 'page name must be english or -';
      }
    }
  });

  if (!pageName) {
    return;
  }

  const camelCaseName = camelCase(pageName).replace(pageName[0], pageName[0].toUpperCase());

  // create dir
  mkdirSync(join(dirPath, pageName));

  // create index file
  writeFileSync(join(dirPath, pageName, 'index.tsx'), pageTemplate(camelCaseName), 'utf-8');
}