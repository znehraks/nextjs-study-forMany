import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  width: auto;
  height: auto;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: beige;
`;
const Box = styled(motion.div)`
  margin-top: 30px;
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.5);
`;

const myVars = {
  start: { scale: 0 },
  end: {
    scale: 1,
    rotateZ: 360,
    transition: { duration: 3, type: "spring", damping: 10 },
  },
};

const FramerMotionPage = () => {
  return (
    <Wrapper>
      <Box
        transition={{ delay: 3, duration: 10 }}
        animate={{ borderRadius: "100px" }}
      />
      <Box
        initial={{ scale: 0, backgroundColor: "lime" }}
        transition={{ duration: 3, type: "spring", stiffness: 10 }}
        animate={{ scale: 1, rotateZ: 360 }}
      />
      <Box
        initial={{ scale: 0, backgroundColor: "lime" }}
        transition={{ duration: 3, type: "spring", damping: 10 }}
        animate={{ scale: 1, rotateZ: 360 }}
      />
      <Box variants={myVars} initial="start" animate="end" />
    </Wrapper>
  );
};

export default FramerMotionPage;
