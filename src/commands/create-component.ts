import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { QuickPickItemKind, window } from "vscode";
import { camelCase } from "../utils/camel-case";

const componentTemplate = (componentName: string, camelCaseName: string) => {
  return `import React from 'react';

export interface ${camelCaseName}Props {

}

export function ${camelCaseName}(props: ${camelCaseName}Props) {
  return (
    <div>
      ${componentName}
    </div>
  );
};`;
};

const modalComponentTemplate = (componentName: string, camelCaseName: string) => {
  return `import React from 'react';
import { Modal } from '@/components/antd';
import NiceModal, { antdModalV5, useModal } from '@ebay/nice-modal-react';

export interface ${camelCaseName}Props {
}

export const ${camelCaseName} = NiceModal.create<${camelCaseName}Props>(() => {
  const modal = useModal();
  const antdV5Modal = antdModalV5(modal);

  return (
    <Modal
      {...antdV5Modal}
    >
      ${componentName}
    </Modal>
  );
});`;
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

  const type = await window.showQuickPick([
    { label: '基础组件', key: 'base', kind: QuickPickItemKind.Default },
    { label: '弹窗组件', key: 'modal',  },
  ]);

  if (!componentName) {
    return;
  }

  const camelCaseName = camelCase(componentName).replace(componentName[0], componentName[0].toUpperCase());

  // create dir
  mkdirSync(join(dirPath, componentName));

  // create index file
  writeFileSync(join(dirPath, componentName, 'index.ts'), indexTemplate(componentName), 'utf-8');

  // create component file

  writeFileSync(
    join(dirPath, componentName, `${componentName}.tsx`),
    type?.key === 'base' ? componentTemplate(componentName, camelCaseName) : modalComponentTemplate(componentName, camelCaseName),
     'utf-8'
  );
}