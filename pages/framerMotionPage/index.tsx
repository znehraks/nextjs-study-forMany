import { motion, useMotionValue, useTransform, Variants } from "framer-motion";
import React, { useEffect, useRef } from "react";
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
  margin: 30px 0;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Circle = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.5);
  width: 70px;
  height: 70px;
  border-radius: 35px;
  place-self: center;
`;

const EventBox = styled(motion.div)`
  margin: 30px 0;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.5);
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const myVars = {
  start: { scale: 0 },
  end: {
    scale: 1,
    rotateZ: 360,
    transition: { duration: 3, type: "spring", damping: 10 },
  },
};

const boxVariants: Variants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const circleVariants: Variants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

const eventVariants: Variants = {
  hover: { scale: 1.2, rotateZ: 90 },
  click: { borderRadius: "100px", scale: 1 },
  drag: { backgroundColor: "rgb(46,204,113)", transition: { duration: 10 } },
};

const FramerMotionPage = () => {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-800, 800], [-360, 360]);
  useEffect(() => {
    //   x.onChange(() => console.log(x.get()));
    rotate.onChange(() => console.log(rotate.get()));
  }, [rotate]);
  return (
    <Wrapper>
      {/* <Box
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
      <Box variants={myVars} initial="start" animate="end" /> */}
      {/* <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box> */}

      {/* <BiggerBox ref={biggerBoxRef}>
        <EventBox
          drag
          dragSnapToOrigin
          dragElastic={0.1}
          dragConstraints={biggerBoxRef}
          variants={eventVariants}
          whileHover="hover"
          whileTap="click"
          whileDrag="drag"
        />
      </BiggerBox> */}
      {/* <button onClick={() => x.set(200)}>click me</button> */}
      <Box style={{ x, rotate }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
};

export default FramerMotionPage;
