import { motion, Variants } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  width: 800px;
  height: 800px;
  background-color: #8ca9bd;
  display: flex;
  flex-direction: column;
  padding: 50px 100px;
`;

const MyMessage = styled(motion.div)`
  border-radius: 15px;
  min-width: 200px;
  align-self: flex-start;
  background-color: #fff;
  color: #000;
  padding: 5px 10px;
`;

const OtherMessage = styled(motion.div)`
  border-radius: 15px;
  min-width: 200px;
  align-self: flex-end;
  background-color: #f7e500;
  color: #000;
  padding: 5px 10px;
`;
const myVars: Variants = {
  start: { opacity: 0.2 },
  end: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.5,
    },
  },
};

const messageVariants: Variants = {
  start: {
    opacity: 0,
    y: 20,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};
const KatalkAnimPage = () => {
  return (
    <Wrapper variants={myVars} initial="start" animate="end">
      <MyMessage variants={messageVariants}>안녕 안녕</MyMessage>
      <OtherMessage variants={messageVariants}>그래그래</OtherMessage>
      <MyMessage variants={messageVariants}>밥 먹었어??</MyMessage>
      <OtherMessage variants={messageVariants}>응 먹었어!</OtherMessage>
      <MyMessage variants={messageVariants}>하하</MyMessage>
      <OtherMessage variants={messageVariants}>캬캬</OtherMessage>
    </Wrapper>
  );
};
export default KatalkAnimPage;
