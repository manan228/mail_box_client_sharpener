import { render, screen } from "@testing-library/react";
import SignUp from "./SignUp";

test("sign up page test 1", () => {
  render(<SignUp />);

  const text = screen.getByText("Sign Up");

  expect(text).toBeInTheDocument();
});

test("sign up page test 2", () => {
  render(<SignUp />);

  const text = screen.getByText("Email");

  expect(text).toBeInTheDocument();
});

test("sign up page test 3", () => {
  render(<SignUp />);

  const text = screen.getByText("Password");

  expect(text).toBeInTheDocument();
});

test("sign up page test 4", () => {
  render(<SignUp />);

  const text = screen.getByText("Confirm Password");

  expect(text).toBeInTheDocument();
});

// test("sign up page test 1", () => {
//   render(<SignUp />);

//   const text = screen.getByText("Sign Up");

//   expect(text).toBeInTheDocument();
// });
