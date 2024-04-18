import { Flex } from "@chakra-ui/react";
import AddClientModal from "../components/AddClientModal";
import Projects from "../components/Projects";
import Clients from "../components/Clients";
import AddProjectModal from "../components/AddProjectModal";

const Home = () => {
  return (
    <>
      <Flex
        flexDirection={"column"}
        paddingTop={"30px"}
        gap={"20px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex gap={5}>
          <AddClientModal />
          <AddProjectModal />
        </Flex>
        <Projects />
        <Clients />
      </Flex>
    </>
  );
};

export default Home;
