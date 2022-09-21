// __tests__/user.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import User from "../components/user";
import "@testing-library/jest-dom";
import React from "react";
import { IUser } from "../models/user";
import { testUsers } from "./testdata/users";

const userData: IUser = testUsers[0];

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  }
}));

describe("User Component - Grid Mode", () => {
  it("check name", () => {
    render(
      <User user={userData} isSmallScreen={false} view="grid" index={0} />
    );

    const heading = screen.getByRole("heading", {
      name: userData.name.first
    });

    expect(heading).toBeInTheDocument();
  });

  it("Check Image", () => {
    render(
      <User user={userData} isSmallScreen={false} view="grid" index={0} />
    );

    const img = screen.getByAltText(userData.name.first) as HTMLImageElement;
    expect(img.getAttribute("src")).toBe(userData.picture.large);
  });

  it("Check Image - Small Screen", () => {
    render(<User user={userData} isSmallScreen={true} view="grid" index={0} />);

    const img = screen.getByAltText(userData.name.first) as HTMLImageElement;
    expect(img.getAttribute("src")).toBe(userData.picture.medium);
  });

  it("Check city", async () => {
    render(
      <User user={userData} isSmallScreen={false} view="grid" index={0} />
    );

    const element = await waitFor(
      () => screen.findByText(userData.location.city),
      {
        timeout: 3000
      }
    );
    expect(element).toBeInTheDocument();
  });

  it("Check email", async () => {
    render(
      <User user={userData} isSmallScreen={false} view="grid" index={0} />
    );

    const el = screen.getByTestId("email");
    expect(el).toHaveAttribute("href", `mailto:${userData.email}`);
  });

  it("Check phone", async () => {
    render(
      <User user={userData} isSmallScreen={false} view="grid" index={0} />
    );

    const element = screen.getByTestId("tel");
    expect(element).toHaveAttribute("href", `tel:${userData.phone}`);
  });
});

describe("User Component - List Mode", () => {
  it("check name", () => {
    render(
      <User user={userData} isSmallScreen={false} view="list" index={0} />
    );

    const heading = screen.getByRole("heading", {
      name: userData.name.first
    });

    expect(heading).toBeInTheDocument();
  });

  it("Check Image - Descktop Screen Size", () => {
    render(
      <User user={userData} isSmallScreen={false} view="list" index={0} />
    );

    const img = screen.getByAltText(userData.name.first) as HTMLImageElement;
    expect(img.getAttribute("src")).toBe(userData.picture.large);
  });

  it("Check Image - Small Screen Size", () => {
    render(<User user={userData} isSmallScreen={true} view="list" index={0} />);

    const img = screen.getByAltText(userData.name.first) as HTMLImageElement;
    expect(img.getAttribute("src")).toBe(userData.picture.medium);
  });

  it("Check city", async () => {
    render(
      <User user={userData} isSmallScreen={false} view="list" index={0} />
    );

    const element = await waitFor(
      () => screen.findByText(userData.location.city),
      {
        timeout: 3000
      }
    );
    expect(element).toBeInTheDocument();
  });

  it("Check email", async () => {
    render(
      <User user={userData} isSmallScreen={false} view="list" index={0} />
    );

    const el = screen.getByTestId("email");
    expect(el).toHaveAttribute("href", `mailto:${userData.email}`);
  });

  it("Check phone", async () => {
    render(
      <User user={userData} isSmallScreen={false} view="list" index={0} />
    );

    const element = screen.getByTestId("tel");
    expect(element).toHaveAttribute("href", `tel:${userData.phone}`);
  });
});
