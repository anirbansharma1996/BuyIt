import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Error404 } from "./pages";
import { Loader } from "./components/shared";
import Layout from "./components/Layout";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
const CategoryView = React.lazy(() => import("./pages/CategoryView"));
const ProductView = React.lazy(() => import("./pages/ProductView"));

const AppWithRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout component={<Home />} />} />
      <Route
        path="/prn/:name/prid/:id"
        element={
          <Suspense fallback={<Loader fullscreen />}>
            <Layout component={<ProductView />} />
          </Suspense>
        }
      />
      <Route
        path="/category"
        element={
          <Suspense fallback={<Loader fullscreen />}>
            <Layout component={<CategoryView />} />
          </Suspense>
        }
      />
      <Route
        path="/not-found"
        element={<Layout noFooter={true} component={<Error404 />} />}
      />
      <Route path="/payment" element={<Layout component={<Payment />} />} />
      <Route
        path="/payment-success"
        element={<Layout component={<Success />} />}
      />
      <Route
        path="*"
        element={<Layout noFooter={true} component={<Error404 />} />}
      />
    </Routes>
  );
};

export default AppWithRouting;
