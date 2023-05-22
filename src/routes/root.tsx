import { Box } from "@chakra-ui/react";
import Nav from "../Nav";
import { Outlet } from "react-router-dom";

export default function Root() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box>
      <Nav user={user} />
      <Box p={(0, 2)}>
        <Outlet />
      </Box>
    </Box>
  );
}
