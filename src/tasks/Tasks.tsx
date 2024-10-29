import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";

const $URL = "https://6706c742a0e04071d2283a54.mockapi.io/api/v1/data";

const Tasks = () => {
  const [taskInputValue, setTaskInputValue] = useState("");
  const [coinsEarned, setCoinsEarned] = useState(
    Number(localStorage.getItem("coinsEarned"))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [focustOnTask, setFocustOnTask] = useState(0);

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

  const handleCoinsEarned = (num) => {
    localStorage.setItem("coinsEarned", `${num}`);
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
      <Heading>{coinsEarned}</Heading>
      <InputGroup>
        <Input
          placeholder="your task"
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
            const isActiveElement = i === focustOnTask;
            return (
              <Flex
                align="center"
                justify="center"
                key={i}
                onClick={() => setFocustOnTask(i)}
                borderRadius="12px"
                border={isActiveElement ? "4px solid red" : "none"}
                p="10px 20px"
              >
                <CheckIcon
                  mr="15px"
                  cursor="pointer"
                  onClick={() => {
                    setCoinsEarned((prev) => prev + 1);
                    deleteData(el.id);
                    handleCoinsEarned(coinsEarned + 1);
                  }}
                />
                <Text
                  key={i}
                  fontSize={isActiveElement ? "30px" : "16px"}
                  fontWeight={isActiveElement ? "700" : "400"}
                  cursor="pointer"
                >
                  {el.string}
                </Text>

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
