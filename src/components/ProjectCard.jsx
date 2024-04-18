import PropTypes from "prop-types";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  console.log(project);
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{project.name}</Heading>
        <Text isTruncated fontSize={12} fontWeight={500}>
         Client: {project.client.name}
        </Text>
      </CardHeader>
      <CardBody>
        <Text isTruncated>{project.description}</Text>
        <Badge
          rounded="4px"
          px="3"
          fontSize="0.8em"
          colorScheme={
            project.status === "In Progress"
              ? "green"
              : project.status === "Not Started"
              ? "red"
              : project.status === "Completed"
              ? "blue"
              : ""
          }
        >
          Status: {project.status}
        </Badge>
      </CardBody>
      <CardFooter>
        <Button as={Link} to={`/projects/${project.id}`}>
          View here
        </Button>
      </CardFooter>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object,
};

export default ProjectCard;
