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
  Avatar,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";

function App() {
  const [valueFromServer, setValueFromServer] = useState([]);
  const [valueFromLocal, setValueFromLocal] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://6706c742a0e04071d2283a54.mockapi.io/api/v1/data"
      );
      const newData = await response.json();

      if (JSON.stringify(newData) !== JSON.stringify(valueFromServer)) {
        setIsLoading(true);

        setValueFromServer(newData);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // const storageValue = localStorage.getItem("inputValue");
    // if (storageValue) {
    //   setValueFromLocal(storageValue);
    // }
    fetchData();

    const pollingInterval = setInterval(fetchData, 1000);
    return () => clearInterval(pollingInterval);
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
          body: JSON.stringify({ string: value, id: 1 }),
        }
      );
      const json = await puting.json();
      return json;
    };
    await putData();
    setIsLoading(false);

    fetchData();
  };

  useEffect(() => {
    if (valueFromLocal === "") return;
    const debounceTimeout = setTimeout(() => {
      handleSubmit(valueFromLocal);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [valueFromLocal]);

  const handleClear = () => {
    handleChange("");
    handleSubmit("");
  };

  const handleChange = (value) => {
    setValueFromLocal(value);
    // localStorage.setItem("inputValue", value);
  };

  return (
    <VStack spacing="10px">
      <HStack align="center" justify="center">
        <Heading m="0px" fontSize="46px">
          Partage:
        </Heading>
        <Box
          background="purple"
          variant="solid"
          borderRadius="4px"
          fontSize="20px"
          p="5px 6px"
        >
          {isLoading && <Spinner boxSize="40px" />}
          {valueFromServer.map(({ string, id }) => {
            return (
              <Tooltip label="Click to copy" key={id}>
                <Box
                  display={isLoading ? "none" : "block"}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(string);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  {string}
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </HStack>

      <Textarea
        placeholder="Write here your information for @Partage"
        h="200px"
        w="300px"
        value={valueFromLocal}
        borderRadius="4px"
        onChange={(e) => handleChange(e.currentTarget.value)}
        p={"10px 10px"}
        resize="none"
      />
      <HStack>
        <Button
          onClick={() => handleSubmit(valueFromLocal)}
          isLoading={isLoading}
        >
          Submit
          <StarIcon ml="6px" />
        </Button>
        <Button onClick={handleClear} isLoading={isLoading}>
          Clear
          <DeleteIcon ml="6px" />
        </Button>
      </HStack>
      <Box position="absolute" bottom="50%" left="10px">
        <Tooltip label="Repository Github">
          <Link href="https://github.com/vasin-oleksii/partage">
            <Avatar
              name="GitHub link"
              src="https://img.icons8.com/m_sharp/200/FFFFFF/github.png"
              borderRadius="50%"
              boxSize="35px"
              transition="all 0.2s"
              _hover={{ boxSize: "45px", transition: "all 0.2s" }}
            />
          </Link>
        </Tooltip>
      </Box>
    </VStack>
  );
}

export default App;
