import { Fragment } from "react";
import { Outlet } from "react-router";
import HeaderContainer from "~/containers/HeaderContainer";

const Header = () => {
  return (
    <Fragment>
      <HeaderContainer />
      <Outlet />
    </Fragment>
  );
};

export default Header;
