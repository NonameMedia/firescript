watch command
=============

The `watch` command starts a file watcher and transpiles `.fire` files into Javascript when their content changes. The command reads configuration from current working dir.

## Usage

```shell
fire watch [srcDir] [destDir]
```

The command takes two optional arguments.
The first `srcDir` overwritess the default source dir
and the second `destDir` overwrites the default destination dir.
