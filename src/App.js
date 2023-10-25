import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import CreatEditMed from "./components/CreatEditMed";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "/createeditmedicin/id",
        element: <CreatEditMed />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
