import PropTypes from "prop-types";
import {
  Heading,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { GET_PROJECT } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_PROJECT } from "../mutations/projectMutation";

const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");
  const toast = useToast();
  const colorTextTitle = useColorModeValue("yellow.500", "yellow.300");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || status === "") {
      return toast({
        title: "Fill required",
        description: "Please fill in all the required fields",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    updateProject(name, description, status);
  };
  return (
    <>
      <Heading
        w="100%"
        textAlign={"center"}
        fontWeight="normal"
        mb="2%"
        fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
        color={colorTextTitle}
      >
        Update Project
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl
          as={GridItem}
          colSpan={[6, 3]}
          color={useColorModeValue("gray.900", "gray.400")}
        >
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl
          as={GridItem}
          colSpan={6}
          color={useColorModeValue("gray.900", "gray.400")}
        >
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <FormControl
          as={GridItem}
          colSpan={[6, 6, null, 2]}
          color={useColorModeValue("gray.900", "gray.400")}
        >
          <FormLabel>Status</FormLabel>
          <Select
            placeholder="Select option"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </FormControl>
        <Button colorScheme="teal" variant="solid" mr={3} type="submit" mt={4}>
          Update
        </Button>
      </form>
    </>
  );
};

EditProjectForm.propTypes = {
  project: PropTypes.object,
};

export default EditProjectForm;
