init command
============

The `init` command creates a configuration in current working dir.
It extends existing configurations. A configuration file can be a `json`, `yaml` or `cson` file.

**The loading order is:**

* .firerc
* .firerc.json
* .firerc.cson
* .firerc.yaml
* .firerc.yml
* package.json (lookup for a `fire` property)

Configuration
-------------

#### `src` - Source folder

Folder of your source files


#### `dest` - Destination folder

Folder where the transpiled files should go.
It keeps the folder structure starting from `src`.

#### ` copy` - Copy files

array of file patterns to be copied from `src` to `dest` by using the `copy` or `watch` command.

#### `features` - Feature configuration

Takes an object of transformer features. See [Transformer](../transformer.md) for a list of all supported features.

#### `ignore` - Ignore files/dir from build

Takes an array of file pattern to be ignored from build
