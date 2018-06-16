Transformer
===========

The transformer transforms modern Javascript into an older syntax. This feature allows using of modern tecnologies even they arent supported by the browser or Node.js version. All modern features enabled by default, which means transformations are all disabled by default. To enable a transformation, switch of a feature by setting a feature flag to false.

Features
--------

| Feature             | Config             | Browsers         | Implemented | Default enabled |
| ------------------- | ------------------ | ---------------- | ----------- | --------------- |
| Import / Export     | esModules          | F 54, C 61, E 16 | yes         | No              |
| Classes             | esClasses          | F 49, C 45, E 13 | yes         | NodeJS only     |
| Template literals   | esTemplates        | F 34, C 41, E 12 | yes         | NodeJS only     |
| Template tags       | esTemplates        | F 34, C 41, E 12 | no          | NodeJS only     |
| let / const vars    | esVars             | F 41, C 44, E 12 | no          | NodeJS only     |
| for of loops        | esLoops            | F 13, C 38, E 12 | no          | NodeJS only     |
| Spread operator     | esSpread           | F 27, C 46, E 12 | no          | NodeJS only     |
| Destructors         | esDestruct         | F 41, C 49, E 14 | no          | NodeJS only     |
| Rest argunments     | esRest             | F 15, C 47, E 12 | no          | NodeJS only     |
| Promises            | esPromises         | F 29, C 32, E yy | no          | NodeJS only     |
| Generator functions | esGenerators       | F 26, C 39, E 13 | no          | NodeJS only     |
| Async await         | esAsync            | F 52, C 55, E ?? | no          | NodeJS only     |
| Default parameter   | esDefaultParameter |                  | yes         | No              |
