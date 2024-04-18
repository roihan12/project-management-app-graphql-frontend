import { useQuery } from "@apollo/client";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

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
          Error GET_CLIENTS
        </AlertTitle>
        <AlertDescription maxWidth="sm">{error.message}</AlertDescription>
      </Alert>
    );

  return (
    <>
      {!loading && !error && data && (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.clients.map((client) => (
                <ClientRow key={client.id} client={client} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Clients;
