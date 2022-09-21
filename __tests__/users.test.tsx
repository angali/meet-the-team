// __tests__/users.test.tsx
import { render, screen, within, fireEvent } from "@testing-library/react";
import Users from "../components/users";
import "@testing-library/jest-dom";
import { IUser } from "../models/user";
import {
  testUsers,
  az_firstItem,
  az_lastItem,
  no_user_found_msg
} from "./testdata/users";

const usersData: IUser[] = testUsers;

beforeEach(() => {
  render(
    <Users
      loading={false}
      users={usersData}
      errorMessage={""}
      isSmallScreen={false}
    />
  );
});

describe("Users Component", () => {
  it("check result length", () => {
    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);

    let listItems = getAllByRole("listitem");
    expect(listItems).toHaveLength(usersData.length);
  });

  it("check default sort - az", () => {
    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);

    let listItems = getAllByRole("heading");
    // check first and last item
    expect(listItems).toHaveLength(listItems.length);
    expect(listItems[0]).toHaveTextContent(az_firstItem);
    expect(listItems[listItems.length - 1]).toHaveTextContent(az_lastItem);
  });

  it("check sort - za", async () => {
    const sortBtn = await screen.findByTestId("sort-btn");
    fireEvent.click(sortBtn, { target: { value: "" } });

    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);

    let listItems = getAllByRole("heading");
    // check first and last item
    expect(listItems).toHaveLength(listItems.length);
    expect(listItems[0]).toHaveTextContent(az_lastItem);
    expect(listItems[listItems.length - 1]).toHaveTextContent(az_firstItem);
  });

  it("check view mode - grid", async () => {
    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);

    let listItems = getAllByRole("listitem");
    // check class name of the first item
    expect(listItems).toHaveLength(listItems.length);
    expect(listItems[0]).toHaveClass("grid-item-container");
  });

  it("check view mode - list", async () => {
    const viewModeBtn = await screen.findByTestId("view-mode-btn");
    fireEvent.click(viewModeBtn, { target: { value: "" } });

    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);

    let listItems = getAllByRole("listitem");
    // check class name of the first item
    expect(listItems).toHaveLength(listItems.length);
    expect(listItems[0]).toHaveClass("list-item-container");
  });

  it("check search- with result", async () => {
    const searchBox = await screen.findByTestId("search-box");
    fireEvent.change(searchBox, { target: { value: testUsers[1].name.first } });

    let listItems = screen.getAllByRole("heading");
    expect(listItems).toHaveLength(1);
    expect(listItems[0]).toHaveTextContent(testUsers[1].name.first);
  });

  it("check search- no result", async () => {
    const searchBox = await screen.findByTestId("search-box");
    fireEvent.change(searchBox, { target: { value: "vvvvvvv" } });

    let result = screen.getByTestId("alert-warning");
    expect(result).toHaveTextContent(no_user_found_msg);
  });
});
