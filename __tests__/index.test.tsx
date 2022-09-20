// __tests__/index.test.tsx

import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Meet the Team/i
    });

    expect(heading).toBeInTheDocument();
  });
});
