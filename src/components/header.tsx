import React, { useContext } from "react";
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
import { ExitToApp, GitHub, PowerSettingsNew } from "@material-ui/icons";
import useSiteMetadata from "../hooks/useSiteMetaData";
import { AmplifyIdentityContext } from "../utils/AmplifyIdentityContextProvider";
import { AuthState } from "@aws-amplify/ui-components";

interface HeaderProps {
  //   siteMetadata: {
  //     title?: string;
  //     subtitle?: string;
  //     repo?: string;
  //   };
  //   pathname?: string;
}
const Header: React.FC<HeaderProps> = () => {
  const { user, authState, signout } = useContext(AmplifyIdentityContext);

  const siteMetadata = useSiteMetadata();

  const theme = useTheme();
  // console.log("path", props.pathname);
  return (
    <AppBar position="static" color="primary">
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

        {authState === AuthState.SignedIn && user && (
          <Tooltip title="Logout">
            <IconButton
              aria-label="logout"
              onClick={async () => await signout()}
              color="inherit"
            >
              <PowerSettingsNew />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
