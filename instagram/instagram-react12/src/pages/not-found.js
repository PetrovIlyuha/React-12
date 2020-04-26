import React from "react";
import Layout from "../components/shared/Layout";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Layout minimalNavbar title="Page Not Found" marginTop={120}>
      <Typography variant="h5" align="center" paragraph>
        Sorry, this page isn't available
      </Typography>
      <Typography variant="h6" align="center" paragraph>
        The link you followed may be broken or was removed{" "}
        <span role="img" aria-label="sad">
          {" "}
          😞
        </span>
        <Link to="/">
          {" "}
          <Typography color="primary" component="span" align="center">
            Go back to Instagram
          </Typography>
        </Link>
      </Typography>{" "}
    </Layout>
  );
}

export default NotFoundPage;
