import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import MediaSettings from "./pages/MediaSettings";
import ServiceSettings from "./pages/ServiceSettings";
import GeneralSettings from "./pages/GeneralSettings";
import MediaManagement from "./pages/MediaManagement";
import ProductManagement from "./pages/ProductManagement";
import UserSettings from "./pages/UserSettings";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p></p>
            </Layout>
          }
        />

        <Route
          path="/search"
          element={
            <Layout>
              <p>Search page</p>
            </Layout>
          }
        />

        <Route
          path="/media-settings"
          element={
            <Layout>
              <MediaSettings />
            </Layout>
          }
        />

        <Route
          path="/service-settings"
          element={
            <Layout>
              <ServiceSettings />
            </Layout>
          }
        />

        <Route
          path="/general-settings"
          element={
            <Layout>
              <GeneralSettings />
            </Layout>
          }
        />

        <Route
          path="/media-management"
          element={
            <Layout>
              <MediaManagement />
            </Layout>
          }
        />

        <Route
          path="/product-management"
          element={
            <Layout>
              <ProductManagement />
            </Layout>
          }
        />

         <Route
          path="/user-settings"
          element={
            <Layout>
              <UserSettings />
            </Layout>
          }
        />


        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
