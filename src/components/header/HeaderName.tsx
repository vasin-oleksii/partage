import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SMILES } from "../../constants/smiles";

const HeaderName = () => {
  const [name, setName] = useState<string>("Partage");

  useEffect(() => {
    const randomSmile = () => {
      const randomNum = Math.floor(Math.random() * SMILES.length);
      setName("Partage " + SMILES[randomNum]);
    };
    randomSmile();
  }, []);

  return (
    <Heading m="0px" fontSize="46px">
      {name}
    </Heading>
  );
};

export default HeaderName;
