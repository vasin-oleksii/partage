import { Button, Input, InputGroup, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

const Tasks = () => {
  const [task, setTask] = useState("");
  const [groupTasks, setGroupTasks] = useState([]);

  return (
    <>
      <InputGroup>
        <Input
          placeholder="your task"
          w="500px"
          p="6px 10px"
          borderRadius="62px 0 0 62px "
          value={task}
          onChange={(e) => setTask(e.currentTarget.value)}
        />
        <Button
          borderRadius="0 62px 62px 0"
          onClick={() => setGroupTasks((prevState) => [...prevState, task])}
          borderColor="white"
        >
          Just do it!
        </Button>
      </InputGroup>
      <VStack spacing="5px">
        {groupTasks.map((el, i) => (
          <Text key={i}>{el}</Text>
        ))}
      </VStack>
    </>
  );
};

export default Tasks;
