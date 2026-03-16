import { render, screen } from "@testing-library/react";
import { expect, test } from "vite-plus/test";
import App from "./App";

test("renders heading", () => {
  render(<App />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
