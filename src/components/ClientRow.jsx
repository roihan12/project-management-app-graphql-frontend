import PropTypes from "prop-types";
import { Tr, Td, Stack, Button, useColorModeValue } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientsMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import UpdateClientModal from "./UpdateClientModal";

const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({
    //     query: GET_CLIENTS,
    //   });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });

  
  const color = useColorModeValue("gray.800", "white");
  return (
    <Tr color={color}>
      <Td>{client.name}</Td>
      <Td>{client.email}</Td>
      <Td>{client.phone}</Td>
      <Td>
        <Stack direction="row" spacing={4}>
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme="teal"
            variant="solid"
            onClick={deleteClient}
          >
            Delete
          </Button>
          <UpdateClientModal client={client} />
        </Stack>
      </Td>
    </Tr>
  );
};

ClientRow.propTypes = {
  client: PropTypes.object,
};

export default ClientRow;
