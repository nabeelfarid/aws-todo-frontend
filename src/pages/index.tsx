import React, { useContext, useEffect } from "react";
import { Box } from "@material-ui/core";
import { navigate } from "gatsby";
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState } from "@aws-amplify/ui-components";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { AmplifyIdentityContext } from "../utils/AmplifyIdentityContextProvider";

const IndexPage = () => {
  const { user, authState } = useContext(AmplifyIdentityContext);

  useEffect(() => {
    if (user && authState === AuthState.SignedIn) {
      console.log("navigating from Index to App ", user);
      navigate("/app", { replace: true });
    }
  }, [user, authState]);

  return (
    <Layout>
      <Seo title="Home" />
      <Box my={2} display="flex" flexDirection="column">
        <AmplifyAuthenticator
          usernameAlias="email"
          initialAuthState={AuthState.SignIn}
        >
          <AmplifySignUp
            slot="sign-up"
            usernameAlias="email"
            formFields={[
              {
                type: "email",
                inputProps: { required: true, autocomplete: "username" },
              },
              {
                type: "password",
                inputProps: {
                  required: true,
                  autocomplete: "new-password",
                },
              },
            ]}
          />
          <AmplifySignIn
            // headerText="My Custom Sign In Text"
            // slot="sign-in"
            usernameAlias="email"
          ></AmplifySignIn>
        </AmplifyAuthenticator>

        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      </Box>
    </Layout>
  );
};

export default IndexPage;
