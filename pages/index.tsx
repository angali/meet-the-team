import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import Users from "../components/users";
import Layout from "../components/Layout";
import { useWindowSize } from "../hooks/useWindowSize";
import { IUser } from "../models/user";
import { UserService } from "../services/UserService";

interface IState {
  loading: boolean;
  users: IUser[];
  errorMessage: string;
  page: number;
}

const Home: NextPage = () => {
  const { isSmallScreen } = useWindowSize();

  const [state, setState] = useState<IState>({
    loading: true,
    users: [] as IUser[],
    errorMessage: "",
    page: 0
  });

  const { loading, users, errorMessage, page } = state;

  useEffect(() => {
    // 👇 Initially load users from the server
    loadUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <Layout>
      <React.Fragment>
        <h1 className="page-title">Meet the Team</h1>
        <Users
          loading={loading}
          users={users}
          errorMessage={errorMessage}
          isSmallScreen={isSmallScreen}
        />
      </React.Fragment>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      seoPageTitle: "Meet The Team"
    }
  };
};

export default Home;
