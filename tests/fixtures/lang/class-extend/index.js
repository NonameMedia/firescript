class Bar extends Foo {
  constructor () {
    super();
    this.value = 'bla';
  }

  blub () {
    return this.bla();
  }
}
