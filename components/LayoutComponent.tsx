import React, { ReactNode } from "react";
import styled from "styled-components";

const Header = styled.div`
  width: 100vw;
  height: 200px;
`;

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header></Header>
      <div>{children}</div>
    </>
  );
};
export default Layout;
