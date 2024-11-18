import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Draggable = ({ children, text }: { children: string; text: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 500 });
  const [isDraggable, setIsDraggable] = useState(false);

  const onClick = () => {
    setIsDraggable((prevState) => !prevState);
  };

  const onMouseMove = (e) => {
    if (isDraggable) {
      setPosition({
        x: Math.max(10, e.clientX),
        y: Math.max(10, e.clientY),
      });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  });

  return (
    <Flex
      align="center"
      flexDir="column"
      position="absolute"
      onClick={onClick}
      onMouseMove={onMouseMove}
      left={isDraggable ? position.x - 35 : position.x}
      top={isDraggable ? position.y - 35 : position.y}
      // boxShadow={`${position.x} ${position.y} white`}
      boxShadow={isDraggable ? "25px 25px 20px white" : ""}
      cursor="grab"
      padding="10px"
      borderColor="white"
      borderWidth="1px"
      borderStyle="solid"
      borderRadius="1rem"
      color="white"
      background="purple.800"
    >
      {children}
      {text}
    </Flex>
  );
};

export default Draggable;
