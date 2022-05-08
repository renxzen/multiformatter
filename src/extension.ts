import * as vscode from "vscode";

var savingState = false;

export function activate(context: vscode.ExtensionContext) {
	const extConfig = vscode.workspace.getConfiguration("multiformatter");
	const config = vscode.workspace.getConfiguration("", {
		languageId: extConfig.get("language")!,
	});

	// const outputChannel = vscode.window.createOutputChannel("multiformatter");
	// outputChannel.appendLine("Multiformatter active.");
	// outputChannel.appendLine("Formatter 1: " + extConfig.get("formatter1"));
	// outputChannel.appendLine("Formatter 2: " + extConfig.get("formatter2"));

	let disposable = vscode.commands.registerCommand(
		"multiformatter.multiformat",
		() => {}
	);

	vscode.workspace.onDidSaveTextDocument((doc) => {
		if (
			!savingState &&
			doc.languageId === extConfig.get("language") &&
			extConfig.get("enabled")
		) {
			savingState = true;

			config
				.update("editor.defaultFormatter", extConfig.get("formatter1"))
				.then(() => {
					vscode.commands
						.executeCommand("editor.action.formatDocument")
						.then(() => {
							config
								.update(
									"editor.defaultFormatter",
									extConfig.get("formatter2")
								)
								.then(() => {
									vscode.commands
										.executeCommand(
											"editor.action.formatDocument"
										)
										.then(() => {
											doc.save().then(() => {
												savingState = false;
												// outputChannel.appendLine(
												// 	"File multiformattted."
												// );
											});
										});
								});
						});
				});
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
