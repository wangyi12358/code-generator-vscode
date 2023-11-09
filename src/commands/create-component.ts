import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { window } from "vscode";
import { camelCase } from "../utils/camel-case";

const componentTemplate = (componentName: string, camelCaseName: string) => {
  return `import React from 'react';

export interface ${camelCaseName}Props {

}

export const ${camelCaseName}: React.FC<${camelCaseName}Props> = () => {
  return (
    <div>
      ${componentName}
    </div>
  );
};`;
};

const indexTemplate = (componentName: string) => {
  return `export * from './${componentName}';`;
};


export async function createComponent(dirPath: string) {
  const componentName = await window.showInputBox({
    placeHolder: 'please input component name',
    prompt: 'component-name',
    validateInput: (value: string) => {
      if (!value) {
        return 'component name is required';
      }
      const reg = /^[a-zA-Z-]+$/;
      if (!reg.test(value)) {
        return 'component name must be english or -';
      }
    }
  });

  if (!componentName) {
    return;
  }

  const camelCaseName = camelCase(componentName).replace(componentName[0], componentName[0].toUpperCase());

  // create dir
  mkdirSync(join(dirPath, componentName));

  // create index file
  writeFileSync(join(dirPath, componentName, 'index.ts'), indexTemplate(componentName), 'utf-8');

  // create component file
  writeFileSync(join(dirPath, componentName, `${componentName}.tsx`), componentTemplate(componentName, camelCaseName), 'utf-8');
}