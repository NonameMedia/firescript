function Bar () {
  Foo.call(this);
  this.value = 'bla';
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.constructor = Foo;
Bar.prototype.blub = function blub () {
  return this.bla();
};
