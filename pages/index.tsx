import type { NextPage } from "next";
import HomeArticle from "../components/HomeArticle";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  min-height: 100vh;
`;

const Home: NextPage = () => {
  return (
    <Wrapper>
      <HomeArticle />
    </Wrapper>
  );
};

export default Home;
