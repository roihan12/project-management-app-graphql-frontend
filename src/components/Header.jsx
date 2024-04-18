import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  HStack,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box as={Link} to={"/"}>
              <Image boxSize="40px" src={logo} alt="Logo" />
            </Box>

            <Text fontSize="xl" fontWeight={"bold"} as={Link} to={"/"}>
              ProjectManagement
            </Text>
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
