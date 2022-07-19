import React from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { userDataSelector } from "../store";

const HomeArticle = () => {
  const userData = useRecoilValueLoadable(userDataSelector);
  if (userData.state !== "hasValue") return <></>;
  return <>{userData.contents.map((item) => item.name)}</>;
};

export default HomeArticle;
