import React from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";

interface IProps {
  testingData: string;
}

const apiCall = () => {
  return new Promise((res, _req) => {
    setTimeout(() => {
      res({ category: "Just some category Data" });
    }, 200);
  });
};

const Category: NextPage<IProps> = ({ testingData }) => {
  const router = useRouter();
  const params = router.query;
  console.log("params", params);

  console.log(testingData);
  return (
    <div>
      <h1>Category</h1>
    </div>
  );
};

Category.getInitialProps = async () => {
  const data: any = await apiCall();
  return { ...data };
};

export default Category;
