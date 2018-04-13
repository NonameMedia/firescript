Using FireScript
================

FireScript comes with a CLI to transpile the sources into Javascipt.
Place a `.firescriptrc` file in your project root to set transpiler options.
The file is interpreted as a `.cson` file.

Transpiler options
------------------

| Option       | Default value | Description                                   |
| ------------ | ------------- | --------------------------------------------- |
| dest         | `lib/`        | Destination folder for transpiled `.js` files |
| src          | `src/`        | Source folder, where the `.fire` files are    |
| features          | `{}`        | Configuration object for language features. See [Langauage features](#Language%20features) |


### Language features

| Option       | Default value | Description                                   |
| ------------ | ------------- | --------------------------------------------- |
| esModules | `false`       | Transpile `import` and `export` statements into EcmaScript modules instead of CommonJS modules.                                              |

### Commands

[`watch`](./cli/watch.html) Watches files for changes and run transpilation of a changed file.
