/* This component shows list of users */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IUser } from "../models/user";
import User from "./user";
import { azIcon, zaIcon, gridIcon, listIcon } from "./svgIcons";

interface IProps {
  loading: boolean;
  users: IUser[];
  errorMessage: string;
  isSmallScreen: boolean;
}

interface IState {
  sort: "az" | "za";
  view: "grid" | "list";
  search: string;
}

const Users: React.FC<IProps> = ({
  loading,
  users,
  errorMessage,
  isSmallScreen
}) => {
  const [state, setState] = useState<IState>({
    sort: "az",
    view: "grid",
    search: ""
  });

  const { view, sort, search } = state;

  // sort users based on the selected sort value
  const sortUsers = () =>
    sort === "az"
      ? users.sort((a: IUser, b: IUser) =>
          a.name.first.toLowerCase() > b.name.first.toLowerCase() ? 1 : -1
        )
      : users.sort((a: IUser, b: IUser) =>
          a.name.first.toLowerCase() < b.name.first.toLowerCase() ? 1 : -1
        );

  // filter the users based on the search term
  const filterUsers = (sortedUsers: IUser[]) =>
    search
      ? (sortedUsers.filter((user: IUser) =>
          user.name.first
            .toLocaleLowerCase()
            .startsWith(search.toLocaleLowerCase())
        ) as IUser[])
      : users;

  /* render list of the users  */
  const usersList = (): JSX.Element => {
    const sortedUsers = sortUsers();
    const filteredUsers = filterUsers(sortedUsers);

    // Handle empty list (no user to display)
    if ((!filteredUsers || !filteredUsers.length) && !loading && !errorMessage)
      return (
        <div data-testid="alert-warning" className="alert-warning">
          No user found!
        </div>
      );

    //show user list
    return (
      <ul className={`${view === "grid" ? "grid-view" : "list-view"}`}>
        {filteredUsers.map((user, index) => (
          <User
            key={index}
            user={user}
            view={view}
            index={index}
            isSmallScreen={isSmallScreen}
          />
        ))}
      </ul>
    );
  };

  // Toolbar of the page containing search box, sort and view mode buttons
  const toolbar = (): JSX.Element => (
    <React.Fragment>
      {/* Large screen toolbar */}
      <div className="lg-toolbar">
        <button
          data-testid="sort-btn"
          aria-label="sort"
          onClick={onChangeModeSort}
        >
          {sort === "az" ? azIcon() : zaIcon()}
        </button>

        {/* <!-- Search box --> */}
        <div className="has-search">
          <span className="fa fa-search search-box-icon"></span>
          <input
            data-testid="search-box"
            type="search"
            placeholder="Search..."
            onChange={onSearch}
          />
        </div>

        <button
          aria-label="view mode"
          className="view-mode-btn"
          data-testid="view-mode-btn"
          onClick={onChangeViewMode}
        >
          {view === "grid" ? gridIcon() : listIcon()}
        </button>
      </div>

      {/* Small screen toolbar */}
      <div className="sm-toolbar">
        {/* <!-- Search box --> */}
        <div className="has-search">
          <span className="fa fa-search search-box-icon"></span>
          <input type="search" placeholder="Search..." onChange={onSearch} />
        </div>

        <div className="sm-toolbar-btn-group">
          {/* Sort button */}
          <button aria-label="sort" onClick={onChangeModeSort}>
            {sort === "az" ? azIcon() : zaIcon()}
          </button>
          {/* View Mode button to switch between grid view and list view */}
          <button
            aria-label="view mode"
            className="view-mode-btn"
            onClick={onChangeViewMode}
          >
            {view === "grid" ? gridIcon() : listIcon()}
          </button>
        </div>
      </div>
    </React.Fragment>
  );

  // handle search
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, search: event.target.value });

  // handle changing sort mode (a-z and z-a)
  const onChangeModeSort = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => setState({ ...state, sort: sort === "az" ? "za" : "az" });

  // handle changing view mode (Grid and List)
  const onChangeViewMode = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => setState({ ...state, view: view === "grid" ? "list" : "grid" });

  return (
    <div className="users-container">
      {/* show an alert if there is any error */}
      {errorMessage && <div className="alert-error">{errorMessage}</div>}

      {/* Show toolbar section */}
      {toolbar()}

      {/* Display List of the users */}
      {usersList()}

      {/* show loading spiner */}
      {loading && (
        <React.Fragment>
          <div className="loading-progress">
            <Image
              src="/static/images/loading.gif"
              width="100px"
              height="100px"
              alt="loading..."
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Users;
