import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "semantic-ui-react";

const Header = () => {
  const [activeItem, setActiveItem] = useState("home");

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

      <Link href="/portfolio" passHref>
        <Menu.Item
          name="portfolio"
          active={activeItem === "portfolio"}
          onClick={handleItemClick}
        >
          Portfolio
        </Menu.Item>
      </Link>

      <Link href="/sample" passHref>
        <Menu.Item
          name="sample"
          active={activeItem === "sample"}
          onClick={handleItemClick}
        >
          Sample
        </Menu.Item>
      </Link>
    </Menu>
  );
};

export { Header };
