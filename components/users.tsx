/* This component shows list of users */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IUser } from "../models/user";
import { UserService } from "../services/UserService";
import User from "./user";
import { azIcon, zaIcon, gridIcon, listIcon } from "./svgIcons";
import { useWindowSize } from "../hooks/useWindowSize";

interface IProps {}

interface IState {
  loading: boolean;
  users: IUser[];
  errorMessage: string;
  sort: "az" | "za";
  view: "grid" | "list";
  search: string;
  page: number;
}

const Users: React.FC<IProps> = () => {
  const { isSmallScreen } = useWindowSize();

  const [state, setState] = useState<IState>({
    loading: true,
    users: [] as IUser[],
    errorMessage: "",
    sort: "az",
    view: "grid",
    search: "",
    page: 0
  });

  const { loading, users, errorMessage, view, sort, search, page } = state;

  useEffect(() => {
    // 👇 Initially load users from the server
    loadUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sort users based on the selected sort value
  const sortUsers = () =>
    sort === "az"
      ? users.sort((a: IUser, b: IUser) =>
          a.name.first.toLowerCase() > b.name.first.toLowerCase() ? 1 : -1
        )
      : users.sort((a: IUser, b: IUser) =>
          a.name.first.toLowerCase() < b.name.first.toLowerCase() ? 1 : -1
        );

  // filter the users based on the search tearm
  const filterUsers = (sortedUsers: IUser[]) =>
    search
      ? (sortedUsers.filter((user: IUser) =>
          user.name.first
            .toLocaleLowerCase()
            .startsWith(search.toLocaleLowerCase())
        ) as IUser[])
      : users;

  // load users from the server
  const loadUsers = async () => {
    try {
      setState(state => ({ ...state, loading: true }));

      const response = await UserService.getUsers(page);
      let usersData = [...users, ...response.data.usersData.results];

      setState(state => ({
        ...state,
        users: usersData || [],
        loading: false,
        errorMessage: ""
      }));
    } catch (error) {
      setState(state => ({
        ...state,
        loading: false,
        errorMessage: "Can not read list of users"
      }));
    }
  };

  /* render list of the users  */
  const usersList = (): JSX.Element => {
    const sortedUsers = sortUsers();
    const filteredUsers = filterUsers(sortedUsers);

    // Handle empty list (no user to display)
    if ((!filteredUsers || !filteredUsers.length) && !loading && !errorMessage)
      return <div className="alert-warning">No user found!</div>;

    //show user list
    return (
      <div className={`${view === "grid" ? "grid-view" : "list-view"}`}>
        {filteredUsers.map((user, index) => (
          <User
            key={index}
            user={user}
            view={view}
            index={index}
            isSmallScreen={isSmallScreen}
          />
        ))}
      </div>
    );
  };

  const toolbar = (): JSX.Element => (
    <React.Fragment>
      {/* Large screen toolbar */}
      <div className="lg-toolbar">
        <button aria-label="sort" onClick={onChangeModeSort}>
          {sort === "az" ? azIcon() : zaIcon()}
        </button>

        {/* <!-- Search box --> */}
        <div className="has-search">
          <span className="fa fa-search search-box-icon"></span>
          <input type="search" placeholder="Search..." onChange={onSearch} />
        </div>

        <button
          aria-label="view mode"
          className="view-mode-btn"
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
          <button aria-label="sort" onClick={onChangeModeSort}>
            {sort === "az" ? azIcon() : zaIcon()}
          </button>

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
