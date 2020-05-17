import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "semantic-ui-react";
import { useLazyQuery } from "@apollo/react-hooks";

import { GET_ME_QUERY } from "../graphql/queries";
import withApollo from "../lib/withApollo";

const Header = () => {
  //todo to review
  const [activeItem, setActiveItem] = useState("home");
  const [getMe, { data, error }] = useLazyQuery(GET_ME_QUERY);
  const [hasResponse, setHasResponse] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe();
  }, []);

  //!
  if (data) {
    if (data.getMe && !user) {
      setUser(data.getMe);
    }
    if (!data.getMe && user) {
      setUser(null);
    }
    if (!hasResponse) {
      setHasResponse(true);
    }
  }

  const handleItemClick = ({ name }: any) => {
    setActiveItem(name);
  };

  return (
    <Menu>
      <Link href="/" passHref>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
        >
          Home
        </Menu.Item>
      </Link>

      {hasResponse && (
        <>
          {user && (
            <>
              <Link href="/portfolio" passHref>
                <Menu.Item
                  name="portfolio"
                  active={activeItem === "portfolio"}
                  onClick={handleItemClick}
                >
                  Portfolio
                </Menu.Item>
              </Link>
              <Link href="/logout" passHref>
                <Menu.Item
                  name="logout"
                  active={activeItem === "logout"}
                  onClick={handleItemClick}
                >
                  Logout
                </Menu.Item>
              </Link>
            </>
          )}
          {(error || !user) && (
            <>
              <Link href="/login" passHref>
                <Menu.Item
                  name="login"
                  active={activeItem === "login"}
                  onClick={handleItemClick}
                >
                  Login
                </Menu.Item>
              </Link>
            </>
          )}
        </>
      )}
    </Menu>
  );
};

export default withApollo(Header);
