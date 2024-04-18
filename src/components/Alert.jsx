import { AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Alert = ({ error }) => {
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
};

Alert.propTypes = {
  error: PropTypes.object,
};
export default Alert;
