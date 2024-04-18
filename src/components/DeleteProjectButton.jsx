import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutation";
import { Button, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <Flex justifyContent={"flex-end"} mb={10}>
      <Button
        colorScheme="red"
        leftIcon={<FaTrash />}
        variant="solid"
        onClick={deleteProject}
        fontSize={{ base: 16, md: 16 }}
        width={{ base: 40, md: 40 }}
      >
        Delete Project
      </Button>
    </Flex>
  );
};

DeleteProjectButton.propTypes = {
  projectId: PropTypes.string,
};
export default DeleteProjectButton;
