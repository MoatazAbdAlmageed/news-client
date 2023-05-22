import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("secret!");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          email,
          password,
        }
      );
      const user = response.data.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      window.location = "/news";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" textAlign="center">
        Login
      </Heading>
      <Box my={8} textAlign="left">
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email address"
                size="lg"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter yourpassword"
                size="lg"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
