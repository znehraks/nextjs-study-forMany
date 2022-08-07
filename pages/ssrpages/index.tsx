import { GetServerSideProps } from "next";
import React from "react";
import { getUser, IUser } from "../../lib/api/user";
type props = {
  users: IUser[];
};
const SsrPages = ({ users }: props) => {
  <>
    {users.map((item) => (
      <>{item.name}</>
    ))}
  </>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const users = await getUser();
  return { props: { users } };
};

export default SsrPages;
