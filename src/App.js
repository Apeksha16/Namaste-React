import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "../index.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import UserProfile from "./components/UserProfile";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import appStore from "./utils/store";

const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[
      {
path:"/",
element:<Body/>,
      },
 {
  path:"/about",
  element:<About/>,
  },
  {
    path:"/contact",
    element:<Contact/>,
  },
  {
    path:"/grocery",
    element:<Suspense fallback={<h1>Loading...</h1>}><Grocery/></Suspense>,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path:"/restaurant/:resId",
    element:<RestaurantMenu/>,
  }
    ],
    errorElement:<Error/>,
  },
 
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);
