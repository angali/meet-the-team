/*  Main layout for all pages */
import React, { Fragment } from "react";
import Router from "next/router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

//loading progress bar apears on top of the page (If there is any link between pages)
Router.events.on("routeChangeStart", (url: URL) => Nprogress.start());
Router.events.on("routeChangeComplete", (url: URL) => Nprogress.done());
Router.events.on("routeChangeError", (url: URL) => Nprogress.done());

type IProps = {
  children: JSX.Element;
};

const Layout: React.FC<IProps> = ({ children }) => {
  const nav = () => null; // for future use

  return (
    <Fragment>
      {nav()} <div className="page-container">{children}</div>
    </Fragment>
  );
};

export default Layout;
