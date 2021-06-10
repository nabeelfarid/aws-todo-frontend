import React from "react";
import { Link as GatsbyLink } from "gatsby";
import {
  useTheme,
  AppBar,
  Box,
  Container,
  Tooltip,
  Typography,
  Toolbar,
  Button,
  IconButton,
} from "@material-ui/core";
import { GitHub, PowerSettingsNew } from "@material-ui/icons";
import useSiteMetadata from "../hooks/useSiteMetaData";

interface HeaderProps {
  //   siteMetadata: {
  //     title?: string;
  //     subtitle?: string;
  //     repo?: string;
  //   };
  //   pathname?: string;
}
const Header: React.FC<HeaderProps> = () => {
  const siteMetadata = useSiteMetadata();

  const theme = useTheme();
  // console.log("path", props.pathname);
  return (
    // <Box mx="auto" textAlign="center" my={4}>

    //   <Grid container>
    //     <Grid item xs={12}>
    //       <Typography
    //         variant="h2"
    //         color="secondary"
    //         component={GatsbyLink}
    //         to="/"
    //         style={{ textDecoration: "none" }}
    //       >
    //         {props.siteMetadata.title}
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Typography variant="h6" color="textSecondary">
    //         {props.siteMetadata.subtitle}
    //       </Typography>
    //     </Grid>
    //   </Grid>
    // </Box>

    <AppBar position="static" color="default">
      <Toolbar>
        <Typography
          variant="h5"
          component={GatsbyLink}
          to="/"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          {siteMetadata.title}
        </Typography>
        <Box flexGrow={1} />

        {/* {props.pathname && (
          <Tooltip title="Home">
            <GatsbyIconButton aria-label="admin" color="inherit" to="/">
              <Home />
            </GatsbyIconButton>
          </Tooltip>
        )} */}
        <Tooltip title="Github Repo">
          <IconButton
            color="inherit"
            aria-label="github"
            href={siteMetadata.repo}
            target="blank"
            rel="noopener"
          >
            <GitHub />
          </IconButton>
        </Tooltip>

        {/* {user && (
            <Tooltip title="Logout">
              <IconButton
                aria-label="logout"
                onClick={async () => await identity.logout()}
                color="secondary"
              >
                <PowerSettingsNew />
              </IconButton>
            </Tooltip>
          )} */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
