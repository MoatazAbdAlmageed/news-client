import {
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";

function News() {
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ key: "", value: "" });

  const handleSearch = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const fetchArticles = async () => {
    setIsLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const sources = user ? Object.values(user.sources) : ["nytimes"];
    const categories = user ? Object.values(user.categories) : ["general"];

    let url = `${
      import.meta.env.VITE_API_URL
    }/api/news?sort=-publishedAt&page=${page}`;

    if (categories.length) {
      url += `&category=${categories.join(",")}`;
    }
    if (sources.length) {
      url += `&source=${sources.join(",")}`;
    }

    if (searchTerm) {
      url += `&search=${searchTerm}`;
    }
    if (filter.key != "") {
      url += `&${filter.key}=${filter.value}`;
    }
    const response = await axios.get(url, {
      headers: {
        // if loged in show customized news !!
        Authorization: "",
      },
    });

    setArticles(response.data.data);
    setPages(
      Array.from({ length: response.data.meta.last_page }, (_, i) => i + 1)
    );
    setIsLoading(false);
    setTotal(response.data.meta.total);
  };

  useEffect(() => {
    fetchArticles();
  }, [page, searchTerm, filter]);
  return (
    <SimpleGrid>
      <Heading as="h2" size="lg" mb={4}>
        Latest News <Badge> {total}</Badge>
      </Heading>

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>

      <Box>
        {filter.value && (
          <>
            <Text>
              {" "}
              {`${filter.key}`}
              <Badge>:{`${filter.value}`}</Badge>{" "}
            </Text>{" "}
            <Button
              colorScheme="red"
              m={2}
              size="xs"
              onClick={() => setFilter({ key: "", value: "" })}
            >
              <CloseIcon />
            </Button>
          </>
        )}
      </Box>

      {isLoading && (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            m="2"
          />
        </Center>
      )}
      {!isLoading && (
        <>
          <SimpleGrid columns={{ base: 1, md: 4, sm: 1 }} spacing={4}>
            {articles.map(
              ({
                attributes: {
                  url,
                  title,
                  description,
                  publishedAt,
                  urlToImage,
                  source,
                  category,
                },
              }) => (
                <Box
                  key={url}
                  bg="white"
                  p={4}
                  boxShadow="md"
                  rounded="md"
                  _hover={{ bg: "gray.300" }}
                >
                  <Link href={url} isExternal>
                    <Image src={urlToImage} alt={title} />
                  </Link>
                  <Heading as="h3" size="md" mb={2}>
                    {title}
                  </Heading>
                  <Text>{description}</Text>
                  <Text>
                    {publishedAt && (
                      <>{formatDistanceToNowStrict(new Date(publishedAt))}</>
                    )}
                    {source && (
                      <Button
                        ml="2"
                        colorScheme="red"
                        size="sm"
                        onClick={() =>
                          setFilter({ key: "source", value: source })
                        }
                      >
                        {source}
                      </Button>
                    )}
                    {category && (
                      <Button
                        ml="2"
                        colorScheme="green"
                        size="sm"
                        onClick={() =>
                          setFilter({ key: "category", value: category })
                        }
                      >
                        {category}
                      </Button>
                    )}
                  </Text>{" "}
                  <Text>
                    <Link href={url} isExternal>
                      Read More{" "}
                    </Link>
                  </Text>
                </Box>
              )
            )}
          </SimpleGrid>

          <SimpleGrid spacing={4}>
            <Box mt={4} textAlign="center">
              {pages.map((x) => (
                <Button
                  m={1}
                  key={x}
                  size="sm"
                  colorScheme={x === page ? "blue" : "gray"}
                  onClick={() => setPage(x)}
                  mx={1}
                >
                  {x}
                </Button>
              ))}
            </Box>
          </SimpleGrid>
        </>
      )}
    </SimpleGrid>
  );
}

export default News;
