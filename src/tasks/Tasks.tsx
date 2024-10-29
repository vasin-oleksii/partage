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
import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";

const $URL = "https://6706c742a0e04071d2283a54.mockapi.io/api/v1/data";

const Tasks = () => {
  const [taskInputValue, setTaskInputValue] = useState("");
  const [coinsEarned, setCoinsEarned] = useState(
    Number(localStorage.getItem("coinsEarned"))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDivider, setIsAddDivider] = useState(false);

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
        <Button
          borderRadius="0 62px 62px 0"
          borderColor="white"
          onClick={() => setIsAddDivider(true)}
        >
          add Divider
        </Button>
      </InputGroup>
      <VStack spacing="5px">
        {isFetchingData || isLoading ? (
          <Spinner />
        ) : (
          allTaskToShowData.map((el, i) => {
            return (
              <Flex align="center" justify="center" key={i}>
                <CheckIcon
                  mr="15px"
                  cursor="pointer"
                  onClick={() => {
                    setCoinsEarned((prev) => prev + 1);
                    deleteData(el.id);
                    handleCoinsEarned(coinsEarned + 1);
                  }}
                />
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
