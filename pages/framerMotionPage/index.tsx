import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
const Wrapper = styled(motion.div)`
  width: auto;
  height: auto;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Box = styled(motion.div)`
  font-size: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 5;
  }
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

const svgVariants: Variants = {
  start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
  end: {
    fill: "rgba(255,255,255,1)",
    pathLength: 1,
  },
};
const presenceVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 50,
    transition: { duration: 1 },
  },
};
const FramerMotionPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153),  rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155),  rgb(238, 173, 0))",
    ]
  );

  const { scrollY, scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  useEffect(() => {
    x.onChange(() => console.log(x.get()));
    rotate.onChange(() => console.log(rotate.get()));
    scrollY.onChange(() => console.log(scrollY.get(), scrollYProgress.get()));
  }, [rotate, scrollY, scrollYProgress, x]);
  return (
    <Wrapper style={{ background: gradient }}>
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
      <Box variants={myVars} initial="start" animate="end" />
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box>

      <BiggerBox ref={biggerBoxRef}>
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
      </BiggerBox>
      <button onClick={() => x.set(200)}>click me</button>
      <Box style={{ x, rotate, scale }} drag="x" dragSnapToOrigin />
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <motion.path
          variants={svgVariants}
          initial="start"
          animate="end"
          transition={{
            default: { duration: 3 },
            fill: { duration: 2, delay: 3 },
          }}
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        />
      </Svg>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        click
      </button>
      <AnimatePresence>
        {isOpen && (
          <Box
            variants={presenceVariants}
            initial="initial"
            animate="visible"
            exit="leaving"
          />
        )}
      </AnimatePresence> */}
      <AnimatePresence>
        {[1, 2, 3, 4, 5, 6, 78, 9, 10].map((item) => (
          <Box key={item}>{item}</Box>
        ))}
      </AnimatePresence>
    </Wrapper>
  );
};

export default FramerMotionPage;
