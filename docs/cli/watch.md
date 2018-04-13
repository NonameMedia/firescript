watch command
=============

The firescript `watch` command starts a file watcher and transpiles `.fire` files into Javascript on a change. The command reads configurations from the `firescript.cson` configuration.

## Usage

```shell
fire watch [srcDir] [destDir]
```

The command takes two optional parameters.
The first `srcDir` overwritess the default source dir
and the second `destDir` overwrites the default destination dir.
