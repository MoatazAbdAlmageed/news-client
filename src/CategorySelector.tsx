import { Box, Checkbox, CheckboxGroup, Heading, Stack } from "@chakra-ui/react";
import { capitalizeFirstLetter, removeElementFromArray } from "./utils";

import axios from "axios";
import { useState } from "react";

const categories = [
  "about",
  "animals-farmed",
  "artanddesign",
  "australia-news",
  "books",
  "business",
  "business-to-business",
  "cardiff",
  "childrens-books-site",
  "cities",
  "commentisfree",
  "community",
  "crosswords",
  "culture",
  "culture-network",
  "culture-professionals-network",
  "edinburgh",
  "education",
  "environment",
  "extra",
  "fashion",
  "film",
  "food",
  "football",
  "games",
  "general",
  "global-development",
  "global-development-professionals-network",
  "government-computing-network",
  "guardian-foundation",
  "guardian-professional",
  "healthcare-network",
  "help",
  "higher-education-network",
  "housing-network",
  "inequality",
  "info",
  "jobsadvice",
  "katine",
  "law",
  "leeds",
  "lifeandstyle",
  "local",
  "local-government-network",
  "media",
  "media-network",
  "membership",
  "money",
  "music",
  "news",
  "politics",
  "public-leaders-network",
  "science",
  "small-business-network",
  "social-care-network",
  "social-enterprise-network",
  "society",
  "society-professionals",
  "sport",
  "stage",
  "teacher-network",
  "technology",
  "theguardian",
  "theobserver",
  "travel",
  "tv-and-radio",
  "uk-news",
  "us-news",
  "voluntary-sector-network",
  "weather",
  "women-in-leadership",
  "working-in-development",
  "world",
];

function CategorySelector() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userCategories = Object.values(user.categories);
  const [checkedCategories, setCheckedCategories] = useState(userCategories);
  const updateUser = (categories: any) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer Bearer gaurLQeRh7WrOwiybVUFKBLqIyM1sLmJBu8KEVn9",
    };

    const data = {
      name: "Moataz",
      categories,
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
        Select Categories
      </Heading>
      <CheckboxGroup defaultValue={userCategories} value={checkedCategories}>
        <Stack spacing={2}>
          {categories.map((category) => (
            <Checkbox
              key={category}
              onChange={(e) => {
                let updated = [];
                if (checkedCategories.includes(category)) {
                  updated = removeElementFromArray(checkedCategories, category);
                } else {
                  updated = [...checkedCategories, category];
                }
                setCheckedCategories(updated);
                user.categories = updated;
                localStorage.setItem("user", JSON.stringify(user));
                updateUser(updated);
              }}
              value={category}
            >
              {capitalizeFirstLetter(category)}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Box>
  );
}

export default CategorySelector;
