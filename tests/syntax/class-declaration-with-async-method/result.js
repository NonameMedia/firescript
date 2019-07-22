class Banana {
  constructor () {
    this.foo = 'foo';
  }

  async bar () {
    const bar = await this.bla();
    return bar;
  }
}
