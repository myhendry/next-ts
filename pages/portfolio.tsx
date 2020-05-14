import React from "react";

import { NextPage } from "next";

interface IProps {
  testingData: string;
}

const apiCall = () => {
  return new Promise((res, _req) => {
    setTimeout(() => {
      res({ testingData: "Just some testing Data" });
    }, 200);
  });
};

const Portfolio: NextPage<IProps> = ({ testingData }) => {
  console.log(testingData);
  return (
    <div>
      <h1>Portfolio</h1>
    </div>
  );
};

Portfolio.getInitialProps = async () => {
  const data: any = await apiCall();
  return { ...data };
};

export default Portfolio;
