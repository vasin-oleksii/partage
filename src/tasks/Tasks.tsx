import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";

const $URL = "https://6706c742a0e04071d2283a54.mockapi.io/api/v1/data";

const Tasks = () => {
  const [taskInputValue, setTaskInputValue] = useState("");
  const [groupTasks, setGroupTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isLoading: isFetchingData,
    data: allTaskToShowData,
    reFetch,
  } = useFetch($URL);

  const postData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch($URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          string: taskInputValue,
          id: allTaskToShowData.length + 1,
        }),
      });
      const result = await response.json();
      console.log(result);
      setTaskInputValue("");
      reFetch();
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = () => {
    postData();
  };

  const deleteData = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${$URL}/${id}`, { method: "DELETE" });
      console.log(response);
      setIsLoading(false);
      reFetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <InputGroup>
        <Input
          placeholder="your task"
          w="500px"
          p="6px 10px"
          borderRadius="62px 0 0 62px "
          value={taskInputValue}
          onChange={(e) => setTaskInputValue(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <Button
          borderRadius="0 62px 62px 0"
          borderColor="white"
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Just do it!
        </Button>
      </InputGroup>
      <VStack spacing="5px">
        {isFetchingData || isLoading ? (
          <Spinner />
        ) : (
          allTaskToShowData.map((el, i) => {
            return (
              <Flex align="center" justify="center" key={i}>
                <Text key={i}>{el.string}</Text>

                <DeleteIcon
                  ml="10px"
                  boxSize="10px"
                  cursor="pointer"
                  onClick={() => deleteData(el.id)}
                />
              </Flex>
            );
          })
        )}
      </VStack>
    </>
  );
};

export default Tasks;
