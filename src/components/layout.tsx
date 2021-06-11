import * as React from "react";
import PropTypes from "prop-types";
import { Box, Container, Divider, Link, Typography } from "@material-ui/core";
import Header from "./header";
import useSiteMetadata from "../hooks/useSiteMetaData";

interface LayoutProps {
  appBarTitle?: string;
  appBarTitleUrl?: string;
}

const Layout: React.FC<LayoutProps> = ({
  appBarTitle,
  appBarTitleUrl,
  children,
}) => {
  const siteMetadata = useSiteMetadata();

  return (
    <>
      <Header appBarTitle={appBarTitle} appBarTitleUrl={appBarTitleUrl} />
      <Container maxWidth="md">
        <Box mt={2}>
          <main>{children}</main>
          <footer>
            <Box mt={5} textAlign="center">
              <Divider />
              <Box mt={1}>
                <Typography>
                  © {new Date().getFullYear()}, Built with
                  {` `}
                  <Link color="primary" href="https://www.gatsbyjs.com">
                    Gatsby
                  </Link>
                </Typography>
                <Typography>
                  {"Powered by "}
                  <Link color="primary" href="https://material-ui.com/">
                    Material-UI
                  </Link>
                  {", "}
                  <Link color="primary" href="https://aws.amazon.com/">
                    AWS
                  </Link>
                  {" and "}
                  <Link color="primary" href="https://graphql.org/">
                    GraphQL
                  </Link>
                </Typography>
                <Typography>
                  {"Hosted on "}
                  <Link
                    color="primary"
                    href="https://aws.amazon.com/cloudfront/"
                  >
                    AWS Cloudfront
                  </Link>
                  {", written by "}
                  {siteMetadata.author}
                  {", inspired by this "}
                  <Link
                    color="primary"
                    href="https://egghead.io/playlists/building-a-serverless-jamstack-todo-app-with-netlify-gatsby-graphql-and-faunadb-53bb"
                  >
                    post
                  </Link>
                </Typography>
              </Box>
            </Box>
          </footer>
        </Box>
      </Container>
    </>
  );
};

export default Layout;
