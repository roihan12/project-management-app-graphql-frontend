import {
  Box,
  List,
  ListItem,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";

const ClientInfo = ({ client }) => {
  return (
    <Box>
      <Text
        fontSize={{ base: "16px", lg: "18px" }}
        color={useColorModeValue("yellow.500", "yellow.300")}
        fontWeight={"500"}
        textTransform={"uppercase"}
        mb={"4"}
      >
        Client Information
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <List
          spacing={2}
          display={"flex"}
          flexDirection={"column"}
          color={useColorModeValue("gray.900", "gray.400")}
        >
          <ListItem
            display={"flex"}
            justifyContent={"flex-start"}
            alignContent={"center"}
            gap={2}
          >
            <FaIdBadge size={20} />
            {client?.name}
          </ListItem>
          <ListItem
            display={"flex"}
            justifyContent={"flex-start"}
            alignContent={"center"}
            gap={2}
          >
            <FaEnvelope size={20} /> {client?.email}{" "}
          </ListItem>{" "}
          <ListItem
            display={"flex"}
            justifyContent={"flex-start"}
            alignContent={"center"}
            gap={2}
          >
            <FaPhone size={20} /> {client?.phone}
          </ListItem>
        </List>
      </SimpleGrid>
    </Box>
  );
};

ClientInfo.propTypes = {
  client: PropTypes.object,
};

export default ClientInfo;
