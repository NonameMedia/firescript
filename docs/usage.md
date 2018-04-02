Using FireScript
================

FireScript comes with a CLI to transpile the sources into Javascipt.
Place a `.firescriptrc.cson` file in your project root to set transpiler options.

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
