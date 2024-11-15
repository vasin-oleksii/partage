import { useEffect, useState } from "react";
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
  useToast,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";

function App() {
  const [valueFromServer, setValueFromServer] = useState([]);
  const [valueFromLocal, setValueFromLocal] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

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
  };

  return (
    <Flex
      justify="center"
      align="center"
      height="100vh"
      background="black"
      overflow="hidden"
    >
      <VStack
        spacing="10px"
        padding="20px 30px"
        background="white"
        borderRadius="20px"
        marginTop={{ base: "-5rem", md: "0px" }}
      >
        <Box>
          <HStack align="center" justify="center" position="relative">
            <Heading m="0px" fontSize="46px">
              Partage 🤬
            </Heading>
            <Box>
              {isLoading && <Spinner boxSize="40px" />}
              {valueFromServer.map(({ string, id }) => {
                return (
                  <Box
                    position="absolute"
                    background="purple"
                    variant="solid"
                    borderRadius="4px"
                    fontSize="20px"
                    p="5px 6px"
                    top={{ base: "50vh", md: "10px" }}
                    left={{ base: "-25px", md: "auto" }}
                    ml={{ base: "0px", lg: "40px" }}
                    color="white"
                    cursor="pointer"
                    maxW="300px"
                    maxH="50vh"
                    overflow="hidden"
                    key={id}
                    noOfLines={13}
                  >
                    <Tooltip label="Click to copy 👇" bg="white" color="black">
                      <Box
                        display={isLoading ? "none" : "block"}
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(string);
                            toast({
                              title: "It's copied 👍 ✨",
                              description:
                                "You copied the content from the form",
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                            });
                            //!
                          } catch (e) {
                            console.error(e);
                          }
                        }}
                      >
                        {string}
                      </Box>
                    </Tooltip>
                  </Box>
                );
              })}
            </Box>
          </HStack>

          <Textarea
            mt="20px"
            placeholder="Write here your information for @Partage"
            height="200px"
            width="250px"
            value={valueFromLocal}
            borderRadius="4px"
            onChange={(e) => handleChange(e.currentTarget.value)}
            p={"10px 10px"}
            resize="none"
          />
          <HStack justify="center" mt="20px">
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
        </Box>
      </VStack>
    </Flex>
  );
}

export default App;
