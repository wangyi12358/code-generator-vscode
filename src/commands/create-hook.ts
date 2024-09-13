import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { window } from "vscode";
import { camelCase } from "../utils/camel-case";

const hookTemplate = (componentName: string, camelCaseName: string) => {
  return `
export function use${camelCaseName}() {
};`;
};

const indexTemplate = (componentName: string) => {
  return `export * from './${componentName}';`;
};


export async function createHook(dirPath: string) {
  const componentName = await window.showInputBox({
    placeHolder: 'please input hook name',
    prompt: 'use-hook',
    validateInput: (value: string) => {
      if (!value) {
        return 'hook name is required';
      }
      const reg = /^[a-zA-Z-]+$/;
      if (!reg.test(value)) {
        return 'hook name must be english or -';
      }
    }
  });

  if (!componentName) {
    return;
  }

  const camelCaseName = camelCase(componentName).replace(componentName[0], componentName[0].toUpperCase());;

  // create dir
  mkdirSync(join(dirPath, componentName));

  // create index file
  writeFileSync(join(dirPath, componentName, 'index.ts'), indexTemplate(componentName), 'utf-8');

  // create component file

  writeFileSync(
    join(dirPath, componentName, `${componentName}.ts`),
    hookTemplate(componentName, camelCaseName),
     'utf-8'
  );
}