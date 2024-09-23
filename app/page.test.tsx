/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";

import mockRouter from "next-router-mock";
import { useRouter } from "next/router";

// import { MemoryRouter } from 'react-router-dom';
jest.mock("next/router", () => jest.requireActual("next-router-mock"));
const ExampleComponent = ({ href = "" }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(href)}>
      The current route is: "{router.asPath}"
    </button>
  );
};
describe("next-router-mock", () => {
  it("mocks the useRouter hook", () => {
    // Set the initial url:
    mockRouter.push("/initial-path");

    // Render the component:
    render(<ExampleComponent href="/foo?bar=baz" />);
    // expect(screen.getByRole("button")).toHaveText(
    //   'The current route is: "/initial-path"'
    // );
    const heading = screen.getByRole("button").innerHTML;
    expect(heading).toBe('The current route is: "/initial-path"');
    // Click the button:
    fireEvent.click(screen.getByRole("button"));
    console.log("localtiion=>", window.location.href, mockRouter);
    // Ensure the router was updated:
    expect(mockRouter).toMatchObject({
      asPath: "/foo?bar=baz",
      pathname: "/foo",
      query: { bar: "baz" },
    });
  });
});
// jest.mock("next/router", () => ({
//   useRouter: jest.fn(),
// }));

describe("Home Page", () => {
  /*beforeEach(() => {
    // Mock the router implementation
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: "/",
    });
  });*/
  /*test("should navigate to the about page and display content", async () => {
    const { push } = useRouter(); // Get the mocked push function

    render(<Page />);

    // Click on the link with the text 'About'
    const aboutLink = screen.getByRole("link", { name: /home/i });
    console.log("aboutLink=>", aboutLink, push);
    aboutLink.click();

    // Check that the push function is called with the correct URL
    expect(push).toHaveBeenCalledWith("/home");

    // Mock the router to simulate navigating to the About page
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: "/home",
    });

    // Render the About page content
    render(<Home />); // Simulate the About page content

    // Check that the page contains the h1 with 'About'
    expect(screen.getByRole("heading", { name: /hello/i })).toBeInTheDocument();
  });*/
});

// it("App Router: Works with Server Components", () => {
//   render(<Page />);
//   expect(screen.getByRole("heading")).toHaveTextContent("/App Router/");
// });
/*
describe("Home Page", () => {
  beforeEach(() => {
    Router.push = jest.fn();
  });

  test("should navigate to the about page and display content", async () => {
    render(<Page />);

    // Click on the link with the text 'About'
    const aboutLink = screen.getByRole("link", { name: /about/i });
    aboutLink.click();

    // Check that the URL is correct
    expect(Router.push).toHaveBeenCalledWith("/about");

    // Render the About page
    Router.push("/about");
    render(<Home />);

    // Check that the page contains the h1 with 'About'
    expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();
  });
});
*/

/*
export const myFunction = (callback: any) => {
  console.log("mockCallback=>", callback);
  callback("Hello", "World");
};
test("myFunction calls the callback with correct arguments", () => {
  const mockCallback = jest.fn(); // Create a mock function

  myFunction(mockCallback); // Call myFunction with the mock

  // Assert that the mock was called with specific arguments
  expect(mockCallback).toHaveBeenCalledWith("Hello", "World");
});*/

/*
const mockPush = jest.fn();

describe("MyComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });
  test("navigates to new page on link click", () => {
    const { getByText } = render(<Page />);

    // Find the link
    const linkElement = getByText(/Home/i);

    // Simulate a click
    fireEvent.click(linkElement);

    // Assert the expected navigation
    // expect(window.location.pathname).toBe("/new-page");
    expect(mockPush).toHaveBeenCalledWith("/new-page");
  });
});*/
