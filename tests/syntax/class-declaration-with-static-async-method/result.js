class Banana {
  constructor () {
    this.foo = 'foo';
  }

  static async bar () {
    const bar = await this.bla();
    return bar;
  }
}
