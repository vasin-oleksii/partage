import { useEffect, useState } from "react";
import "./App.css";
import {
  HStack,
  VStack,
  Textarea,
  Button,
  Heading,
  Spinner,
  Box,
} from "@chakra-ui/react";

function App() {
  const [valueFromServer, setValueFromServer] = useState([]);
  const [valueFromLocal, setValueFromLocal] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const fetching = await fetch(
      "https://6706c742a0e04071d2283a54.mockapi.io/api/v1/data"
    );
    const json = await fetching.json();
    setValueFromServer(json);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (value) => {
    const putData = async () => {
      setIsLoading(true);
      const puting = await fetch(
        "https://6706c742a0e04071d2283a54.mockapi.io/api/v1/data/1",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ string: value }),
        }
      );
      const json = await puting.json();
      return json;
    };
    await putData();
    setIsLoading(false);

    fetchData();
  };

  return (
    <VStack>
      <HStack>
        <Heading>Partage:</Heading>
        {isLoading && <Spinner />}
        {valueFromServer.map(({ string, id }) => {
          return (
            <Box
              key={id}
              background="purple"
              variant="solid"
              borderRadius="4px"
              p="5px 6px"
            >
              {string}
            </Box>
          );
        })}
      </HStack>

      <Textarea
        placeholder="Write here your information for @Partage"
        h="200px"
        w="300px"
        value={valueFromLocal}
        borderRadius="4px"
        onChange={(e) => setValueFromLocal(e.currentTarget.value)}
        p="10px 10px"
      />
      <HStack>
        <Button
          onClick={() => handleSubmit(valueFromLocal)}
          isLoading={isLoading}
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            setValueFromLocal("");
            handleSubmit("");
          }}
          isLoading={isLoading}
        >
          Clear
        </Button>
      </HStack>
    </VStack>
  );
}

export default App;
