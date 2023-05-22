import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { capitalizeFirstLetter } from "./utils";

const Links = ["news", "sources", "categories"];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Nav({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {user && (
                <>
                  {Links.map((link) => (
                    <Link key={link} to={link}>
                      {capitalizeFirstLetter(link)}
                    </Link>
                  ))}
                </>
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {user ? (
              <>
                <Text> {user?.name}</Text>

                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={
                        "https://images.unsplash.com/profile-1673288548795-edb0353adaf8image?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff"
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <Link to="profil">
                      {" "}
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Link to={"login"}>Login</Link>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
