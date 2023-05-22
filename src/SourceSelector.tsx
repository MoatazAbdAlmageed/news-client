import { Box, Checkbox, CheckboxGroup, Heading, Stack } from "@chakra-ui/react";
import { capitalizeFirstLetter, removeElementFromArray } from "./utils";

import axios from "axios";
import { useState } from "react";

const sources = [
  "abc-news",
  "al-jazeera-english",
  "ars-technica",
  "associated-press",
  "bleacher-report",
  "bloomberg",
  "breitbart-news",
  "business-insider",
  "buzzfeed",
  "cbs-news",
  "cnn",
  "crypto-coins-news",
  "engadget",
  "entertainment-weekly",
  "espn",
  "espn-cric-info",
  "fortune",
  "fox-news",
  "fox-sports",
  "google-news",
  "hacker-news",
  "ign",
  "mashable",
  "medical-news-today",
  "msnbc",
  "mtv-news",
  "national-geographic",
  "nbc-news",
  "new-scientist",
  "next-big-future",
  "nfl-news",
  "nhl-news",
  "polygon",
  "recode",
  "reddit-r-all",
  "reuters",
  "techcrunch",
  "techradar",
  "the-huffington-post",
  "the-next-web",
  "the-verge",
  "the-wall-street-journal",
  "the-washington-post",
  "the-washington-times",
  "usa-today",
  "wired",
  "The Guardian",
  "The Observer",
  "theguardian.com",
  "axios",
  "national-review",
  "newsweek",
  "new-york-magazine",
  "politico",
  "the-american-conservative",
  "the-hill",
  "time",
  "vice-news",
  "nytimes",
];

function SourceSelector() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userSources = Object.values(user.sources);
  const [checkedSources, setCheckedSources] = useState(userSources);

  const updateUser = (sources: any) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer Bearer gaurLQeRh7WrOwiybVUFKBLqIyM1sLmJBu8KEVn9",
    };

    const data = {
      name: "Moataz",
      sources,
    };

    axios({
      method: "PUT",
      url: `${import.meta.env.VITE_API_URL}/api/profile`,
      headers: headers,
      data: data,
    })
      .then((response: { data: any }) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <Box w="xl" borderWidth={1} borderRadius={8} p={4}>
      <Heading as="h3" size="md" mb={2}>
        Select Sources
      </Heading>
      <CheckboxGroup defaultValue={userSources} value={checkedSources}>
        <Stack spacing={2}>
          {sources.map((source) => (
            <Checkbox
              onChange={(e: any) => {
                let updated = [];
                if (checkedSources.includes(source)) {
                  updated = removeElementFromArray(checkedSources, source);
                } else {
                  updated = [...checkedSources, source];
                }
                setCheckedSources(updated);
                user.sources = updated;
                localStorage.setItem("user", JSON.stringify(user));
                updateUser(updated);
              }}
              key={source}
              value={source}
            >
              {capitalizeFirstLetter(source)}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Box>
  );
}

export default SourceSelector;
