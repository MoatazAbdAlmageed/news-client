import { RouterProvider, createBrowserRouter } from "react-router-dom";

import CategorySelector from "./CategorySelector";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorPage from "./error-page";
import Login from "./Login";
import News from "./News";
import Root from "./routes/root";
import SourceSelector from "./SourceSelector";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "news",
        element: <News />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "categories",
        element: <CategorySelector />,
      },
      {
        path: "sources",
        element: <SourceSelector />,
      },
    ],
  },
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
