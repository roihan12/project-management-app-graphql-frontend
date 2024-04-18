import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CLIENT } from "../mutations/clientsMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import PropTypes from "prop-types";
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
import { EditIcon } from "@chakra-ui/icons";

const UpdateClientModal = ({ client }) => {
  //   const { error, data } = useQuery(GET_CLIENT, { variables: { id: clientId } });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [name, setName] = useState(client?.name);
  const [email, setEmail] = useState(client?.email);
  const [phone, setPhone] = useState(client?.phone);

  const initialRef = React.useRef(null);

  const [updateClient] = useMutation(UPDATE_CLIENT, {
    variables: { id: client.id, name, email, phone },
    refetchQueries: [{ query: GET_CLIENTS }],
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

    updateClient(name, email, phone);

    setName("");
    setEmail("");
    setPhone("");
    onClose();
  };

  return (
    <>
      <Button
        rightIcon={<EditIcon />}
        colorScheme="teal"
        onClick={onOpen}
        variant="outline"
      >
        Edit
      </Button>
      {client && (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleSubmit}>
              <ModalHeader>Update Client</ModalHeader>
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
                  Update
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

UpdateClientModal.propTypes = {
  client: PropTypes.object,
};

export default UpdateClientModal;
