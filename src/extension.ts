import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "swassistant" is now active!');
    const webview = vscode.commands.registerCommand('swassistant.webview', () => {
		vscode.window.showInformationMessage('Hello from SWAssistant!');
        let panel = vscode.window.createWebviewPanel("webview", "Coding Agent", {
            viewColumn: vscode.ViewColumn.Beside,
        }, {
			enableScripts: true,
			retainContextWhenHidden: true
		});

		let scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "ui", "dist", "index.js"));
    let cssSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "ui", "dist", "index.css"));

        panel.webview.html = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <link rel="stylesheet" href="${cssSrc}" />
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <script src="${scriptSrc}"></script>
          </body>
        </html>
        `;
    });
	context.subscriptions.push(webview);
}

export function deactivate() {}
