import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Spinner,
  Box,
  chakra,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import ProjectCard from "./ProjectCard";

const Projects = () => {
  const colorText = useColorModeValue("gray.900", "gray.400");
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading)
    return (
      <Flex h="100vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    );
  if (error)
    return (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Error GET_PROJECTS
        </AlertTitle>
        <AlertDescription maxWidth="sm">{error.message}</AlertDescription>
      </Alert>
    );

  return (
    <>
      {data.projects.length > 0 ? (
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            py={10}
            fontWeight={"bold"}
            color={colorText}
          >
            Projects
          </chakra.h1>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            {data.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </SimpleGrid>
        </Box>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};

export default Projects;
