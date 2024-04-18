import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientsMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

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
} from "@chakra-ui/react";

const AddClientModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const initialRef = React.useRef(null);

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      return toast({
        title: "Fill required",
        description: "Please fill in all the required fields",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    addClient(name, email, phone);

    setName("");
    setEmail("");
    setPhone("");
    onClose();
  };

  return (
    <>
      <Button leftIcon={<FaUser />} onClick={onOpen} width={"150px"}>
        Add Client
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Add New Client</ModalHeader>
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
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Phone</FormLabel>
                <Input
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" variant="solid" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddClientModal;
