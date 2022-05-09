import * as vscode from "vscode";

var savingState = false;

export function activate(context: vscode.ExtensionContext) {
	const extConfig = vscode.workspace.getConfiguration("multiformatter");
	const config = vscode.workspace.getConfiguration("", {
		languageId: extConfig.get("language")!,
	});

	let disposable = vscode.commands.registerCommand(
		"multiformatter.multiformat",
		() => {
			// const doc = vscode.window.activeTextEditor?.document!;
			// removed
		}
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
