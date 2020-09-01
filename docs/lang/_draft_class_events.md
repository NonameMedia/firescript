Class events
============

Every class has built in event handling

Syntax
------

```
class FireAlert
  setAlert ()
    trigger 'fire.alert'
      message: 'Firealert'
      status: 123
      foo: 'bar'

const fireAlert = new FireAlert()

listen 'fire.alert' as event, data from fireAlert
  log 'Fire alert triggered'
  log Event: event
  log Data: data

unlisten 'fire-alert' from fireAlert
```

#### Firescript

```fire

```

#### Javascript

```js

```
