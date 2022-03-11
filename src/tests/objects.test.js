import { alterContext, alterObjects, iterate } from "../exercises/objects";

describe("Objects", () => {
  let a;
  let b;
  let C;

  beforeEach(() => {
    a = {
      name: "Charlie",
      greeting: "Hello",
      sayIt: function () {
        return `${this.greeting}, ${this.name}!`;
      },
    };

    b = {
      name: "Rebecca",
      greeting: "Yo",
    };

    C = function (name) {
      this.name = name;
      return this;
    };
  });

  test("you should be able to alter the context in which a method runs", () => {
    expect(alterContext(a.sayIt, b)).toEqual("Yo, Rebecca!");
  });

  test("you should be able to alter multiple objects at once", () => {
    const obj1 = new C("Rebecca");
    const obj2 = new C("Melissa");
    const greeting = "What's up";

    alterObjects(C, greeting);

    expect(obj1.greeting).toEqual(greeting);
    expect(obj2.greeting).toEqual(greeting);
    expect(new C("Ellie").greeting).toEqual(greeting);
  });

  test('you should be able to iterate over an object\'s "own" properties', () => {
    C = function () {
      this.foo = "bar";
      this.baz = "bim";
    };

    C.prototype.bop = "bip";

    const obj = new C();

    expect(iterate(obj)).toEqual(["foo: bar", "baz: bim"]);
  });
});
