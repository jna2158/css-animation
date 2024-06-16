import React, { useEffect, useState } from 'react';
import { useSpring, animated, } from 'react-spring';
import styled from 'styled-components';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function App() {
  const [boxLeft, setBoxLeft] = useState([
    { item: "1번째", left: "0%" },
    { item: "2번째 지원이가 최고로 예뻐요!", left: "0%" },
  ]);

  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }));

  const handleClickBox = (idx) => {
    setBoxLeft((prevBoxLeft) => {
      const updatedBoxLeft = JSON.parse(JSON.stringify(prevBoxLeft));

      if (updatedBoxLeft[idx].left === "0%") {
        updatedBoxLeft[idx].left = '15.5%';
      } else {
        updatedBoxLeft[idx].left = '0%';
      }
      return updatedBoxLeft;
    });
  };

  return (
    <animated.div
      onClick={() => set({ xys: calc(1200, 500) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{
        transform: props.xys.to(trans),
      }}
    >
      <LeftSide>
        {
          boxLeft.map((value, idx) => {
            return <LeftBox idx={idx + 1} box={value.left} onClick={() => handleClickBox(idx)} key={idx}>{value.item}</LeftBox>
          })
        }
      </LeftSide>
    </animated.div>
  );
}

export default App;

const LeftSide = styled.section`
  width: 50%;
  height: 100vh;
`;

const LeftBox = styled.div`
  height: 7vh;
  margin: 7%;
  cursor: pointer;
  position: relative;
  transition: left 2s, transform 2s;
  left: ${(props) => {
    return props.box;
  }};
  background-color: rgb(2, 211, 248);
  clip-path: polygon(34% 0, 46% 9%, 100% 9%, 100% 78%, 0 78%, 0 28%, 0 0);
`;
