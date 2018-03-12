try...catch
=========

The `try...catch` statement marks a block of statements to try. If an `Error` gets thrown within a `try` block the `catch` block is evaluated.

Syntax
------

```
try
  [body]
catch err
  [catch block]
```

#### FireScript

```fire
try
  db.connect()
catch err
  console.log(err)
```

#### Javascript

```js
try {
  db.connect();
} catch (err) {
  console.log(err);
}
```
