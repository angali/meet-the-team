import React from "react";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import Users from "../components/users";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <React.Fragment>
        <h1 className="page-title">Meet the Team</h1>
        <Users />
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
