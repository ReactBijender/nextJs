/**
 * @jest-environment jsdom
 */
import Home, { add } from "@/pages/home/index";
import { render, screen } from "@testing-library/react";

jest.mock("axios");
/*
describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});*/
describe("Page", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toBeInTheDocument();
  });
  it("add method", () => {
    expect(add(1, 2)).not.toBe(4);
    //expect(a + b).not.toBe(0);
  });
});
//! Common Matchers
/***!SECTION
 The simplest way to test a value is with exact equality.

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
 */
//toBe uses Object.is to test exact equality. If you want to check the value of an object, use toEqual:
//toEqual recursively checks every field of an object or array.
//toEqual ignores object keys with undefined properties, undefined array items, array sparseness, or object type mismatch. To take these into account use toStrictEqual instead.
//You can also test for the opposite of a matcher using not
/*
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});*/
//!Truthiness
//In tests, you sometimes need to distinguish between undefined, null, and false, but you sometimes do not want to treat these differently. Jest contains helpers that let you be explicit about what you want.
test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});
//!Numbers
//Most ways of comparing numbers have matcher equivalents.
test("two plus two", () => {
  const value = 2 + 2.1;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4.1);
  expect(value).toEqual(4.1);
});
//For floating point equality, use toBeCloseTo instead of toEqual, because you don't want a test to depend on a tiny rounding error.
test("adding floating point numbers", () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});

/** 
 * 
 toBeNull matches only null
toBeUndefined matches only undefined
toBeDefined is the opposite of toBeUndefined
toBeTruthy matches anything that an if statement treats as true
toBeFalsy matches anything that an if statement treats as false
*/
//!Strings
//You can check strings against regular expressions with toMatch:

test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect("Christoph Hello").toMatch(/Hello/);
});
//!Arrays and iterables
const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "milk",
];

test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("paper towels");
  expect(new Set(shoppingList)).toContain("milk");
});

//!Exceptions
function compileAndroidCode() {
  throw new Error("you are using the wrong JDK!");
}
test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use a string that must be contained in the error message or a regexp
  expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  // Or you can match an exact error message using a regexp like below
  // expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});
//! Testing Asynchronous Code
// Promises
// Async/Await
/*
test('the data is peanut butter', async () => {
  // return expect(fetchData()).resolves.toBe('peanut butter');
  // await expect(fetchData()).resolves.toBe('peanut butter');
  await expect(fetchData()).rejects.toMatch('error');
});
const fetchData=()=>{
  // return new Promise((resolve)=>{
  //   setTimeout(() => {
  //   return resolve("peanut butter");
  //   }, 4000);
  // });
  return new Promise((resolve, reject)=>{
    setTimeout(() => {
    return reject("error");
    }, 4000);
  });
}*/
test("resolves to lemon", () => {
  // make sure to add a return statement
  return expect(Promise.resolve("lemon")).resolves.toBe("lemon");
});

//! toHaveBeenCalled
// Use .toHaveBeenCalled to ensure that a mock function was called.

// For example, let's say you have a drinkAll(drink, flavour) function that takes a drink function and applies it to all available beverages. You might want to check that drink gets called. You can do that with this test suite:
function drinkAll(callback: any, flavour: any) {
  if (flavour !== "octopus") {
    callback(flavour);
  }
}

describe("drinkAll", () => {
  test("drinks something lemon-flavoured", () => {
    const drink = jest.fn();
    drinkAll(drink, "lemon");
    expect(drink).toHaveBeenCalled();
  });

  test("does not drink something octopus-flavoured", () => {
    const drink = jest.fn();
    drinkAll(drink, "octopus");
    expect(drink).not.toHaveBeenCalled();
  });
});
describe("the La Croix cans on my desk", () => {
  test("check variable define", () => {
    const n = [2];
    expect(n).toStrictEqual([2]);
  });
});
// @Scoping
// The top level before* and after* hooks apply to every test in a file. The hooks declared inside a describe block apply only to the tests within that describe block.
describe("Scoped / Nested block", () => {
  beforeAll(() => console.log("2 - beforeAll"));
  afterAll(() => console.log("2 - afterAll"));
  beforeEach(() => console.log("2 - beforeEach"));
  afterEach(() => console.log("2 - afterEach"));

  test("", () => console.log("2 - test"));
});

//! Using a mock function
// const mockCallback = jest.fn(x => 42 + x);
const mockCallback = jest.fn((x) => {
  console.log("mockCallback=>", x, 42 + x);
  return 42 + x;
});
test("forEach mock function", () => {
  forEach([3, 1], mockCallback);

  // The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);
  // console.log("mockCallback.mock.=>", mockCallback.mock)
  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(3);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(45);
});
export function forEach(items: any, callback: any) {
  for (const item of items) {
    // console.log("item=>", item)
    callback(item);
  }
}

//! API Test
/*
test("should fetch users", async () => {
  const users: any = [{ name: "Bob" }];
  const resp: any = { data: users };
  // axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  const PromiseData = new Promise(async (resolve: any, reject: any) => {
    const data = await fetchTodos();
    console.log("f=>", data);
    resolve(data);
  });
  console.log("data=>", PromiseData);
  // return Users().then((data)=>{
  //   console.log("data=>", Users().)
  //   expect(data).toEqual(users);
  // });
});*/
