# Multiformatter

Formats with multiple code formatters on language specific file save. This extension only activates when you save with ctrl+s (cmd+s on mac).

## Requirements

Having a .vscode/settings.json on each workspace with language specific configurations. This is an example:

![](https://i.imgur.com/aamyr2R.png)

I do recommend having this setting off to avoid annoyances:

```
"editor.formatOnSave": false
```

## Extension Settings

This extension contributes the following settings:

* `multiformatter.enabled`: enable/disable this extension. only formats on save
* `multiformatter.language`: sets the language of this extension.
* `multiformatter.formatter1`: sets the first formatter to format the code
* `multiformatter.formatter2`: sets the second formatter to format the code after the first one is done

## Known Issues

When vscode format on save is on, it becomes very annoying.

## Release Notes

### 1.0.0

Initial release