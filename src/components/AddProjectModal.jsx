import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutation";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
  Textarea,
  Select,
} from "@chakra-ui/react";

const AddProjectModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const toast = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

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

    addProject(name, description, status, clientId);

    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
    onClose();
  };

  if (loading) return null;
  if (error) return `Something Wen Wrong`;

  return (
    <>
      {!loading && !error && (
        <>
          <Button
            leftIcon={<FaList />}
            onClick={onOpen}
            width={"150px"}
            colorScheme="teal"
          >
            Add Project
          </Button>

          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <form onSubmit={handleSubmit}>
                <ModalHeader>Add New Project</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
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

                  <FormControl mt={4}>
                    <FormLabel>Client</FormLabel>
                    <Select
                      placeholder="Select Client"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                    >
                      {data?.clients?.map((client) => (
                        <option value={client.id} key={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="teal"
                    variant="solid"
                    mr={3}
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default AddProjectModal;
