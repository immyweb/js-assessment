import { steps, fib } from "../exercises/algorithms";

describe("Algorithms", () => {
  beforeEach(() => {
    jest.spyOn(console, "log");
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  describe("you should be able to console log a step shape with N levels", () => {
    test("steps called with n = 1", () => {
      steps(1);
      expect(console.log.mock.calls[0][0]).toEqual("#");
      expect(console.log.mock.calls.length).toEqual(1);
    });

    test("steps called with n = 2", () => {
      steps(2);
      expect(console.log.mock.calls[0][0]).toEqual("# ");
      expect(console.log.mock.calls[1][0]).toEqual("##");
      expect(console.log.mock.calls.length).toEqual(2);
    });

    test("steps called with n = 3", () => {
      steps(3);
      expect(console.log.mock.calls[0][0]).toEqual("#  ");
      expect(console.log.mock.calls[1][0]).toEqual("## ");
      expect(console.log.mock.calls[2][0]).toEqual("###");
      expect(console.log.mock.calls.length).toEqual(3);
    });
  });

  test("you should be able to return the n-th entry in the fibonacci series", () => {
    expect(fib(1)).toEqual(1);
    expect(fib(2)).toEqual(1);
    expect(fib(3)).toEqual(2);
    expect(fib(4)).toEqual(3);
    expect(fib(39)).toEqual(63245986);
  });
});
