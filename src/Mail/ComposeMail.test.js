import { render, screen } from "@testing-library/react";
import ComposeMail from './ComposeMail';

test("login page test 1", () => {
  render(<ComposeMail />);

  const text = screen.getByText("Mail");

  expect(text).toBeInTheDocument();
});
