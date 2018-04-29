function Banana () {
  this.value = 'banana';
}

Object.defineProperty(Banana.prototype, 'fruit', {
  get: function() {
    return this.value;
  },
  set: function(value) {
    this.value = value;
  }
});
