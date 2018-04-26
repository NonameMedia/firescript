function Foo () {
  this.value = 'foo';
}
Foo.prototype.bla = function bla () {
  return this.value;
};
