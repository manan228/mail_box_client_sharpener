import { render, screen } from "react-dom";
import Login from "./Login";

test("login page test 1", () => {
  render(<Login />);

  const text = screen.getByText("Login");

  expect(text).toBeInTheDocument();
});

test("login page test 2", () => {
  render(<Login />);

  const text = screen.getByText("Email");

  expect(text).toBeInTheDocument();
});

test("login page test 3", () => {
  render(<Login />);

  const text = screen.getByText("Password");

  expect(text).toBeInTheDocument();
});

test("login page test 4", () => {
  render(<Login />);

  const text = screen.getByText("Forgot Password");

  expect(text).toBeInTheDocument();
});

//   test("login page test 1", () => {
//     render(<Login />);

//     const text = screen.getByText("Login");

//     expect(text).toBeInTheDocument();
//   });
