// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { createComponent } from './commands/create-component';
import { createNext } from './commands/create-next';
import { createPage } from './commands/create-page';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "codegenerator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('codegenerator.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from code-generator!');
	});

  const createComponentCommand = vscode.commands.registerCommand('createComponent', async (uri: vscode.Uri) => {
    const dirPath = uri.fsPath;
    await createComponent(dirPath);
  });

  const createPageCommand = vscode.commands.registerCommand('createPage', async (uri: vscode.Uri) => {
    const dirPath = uri.fsPath;
    await createPage(dirPath);
  });

  const createNextCommand = vscode.commands.registerCommand('createNext', async (uri: vscode.Uri) => {
    const dirPath = uri.fsPath;
    await createNext(dirPath);
  });

  context.subscriptions.push(createComponentCommand);
  context.subscriptions.push(createPageCommand);
  context.subscriptions.push(createNextCommand);
	// context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
