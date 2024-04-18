import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import Alert from "../components/Alert";
import {
  Box,
  Stack,
  Text,
  VStack,
  Button,
  Heading,
  StackDivider,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";

const Project = () => {
  const { id } = useParams();
  const colorDivider = useColorModeValue("gray.200", "gray.600");
  const colorTextTitle = useColorModeValue("yellow.500", "yellow.300");
  const colorText = useColorModeValue("gray.900", "gray.400");
  const { error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (error) return <Alert error={error} />;

  return (
    <>
      {!error && data && (
        <>
          <Button
            as={Link}
            to={"/"}
            display={{ base: "none", md: "block" }}
            width={20}
            mt={30}
            size="md"
            variant="link"
          >
            Back
          </Button>

          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                color={colorTextTitle}
              >
                {data?.project?.name}
              </Heading>

              <Badge
                rounded="4px"
                px="4"
                mt={5}
                fontWeight={600}
                fontSize={{ base: 10, md: 14 }}
                colorScheme={
                  data?.project.status === "In Progress"
                    ? "green"
                    : data?.project.status === "Not Started"
                    ? "red"
                    : data?.project.status === "Completed"
                    ? "blue"
                    : ""
                }
              >
                Status: {data?.project?.status}
              </Badge>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={<StackDivider borderColor={colorDivider} />}
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={"lg"} color={colorText}>
                  {data?.project?.description}
                </Text>
              </VStack>
              <ClientInfo client={data?.project?.client} />
              <EditProjectForm project={data.project} />
            </Stack>

            <DeleteProjectButton projectId={id} />
          </Stack>
        </>
      )}
    </>
  );
};

export default Project;
