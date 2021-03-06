import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { getAccessToken, setAccessToken } from "./accessToken";
import App from "./App";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloLink, Observable } from "apollo-link";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { createUploadLink } from "apollo-upload-client";
//import { Snackbar } from "@material-ui/core";
import history from "./history";

const cache = new InMemoryCache({});

//#############################################################################
// const consoleLink = new ApolloLink((operation, forward) => {
//   console.log(`starting request for ${operation.operationName}`);
//   return forward(operation).map(data => {
//     console.log(`ending request for ${operation.operationName}`);
//     return data;
//   });
// });

//#############################################################################
const uploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

//#############################################################################
const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          // console.log("index 41: request link operation", operation);
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

//#############################################################################
const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    //console.log("index 69: token refresh link");
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

//#############################################################################
const errorHandler = onError(({ graphQLErrors, networkError }) => {
  // console.log(" index 104: Error handler link");
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path, locations }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      if (message.includes("not authenticated")) {
        history.push("/register");
      }
      // else {
      //   console.log("dispatch");
      //   SnackbarStore.dispatch.snackbar.handleOpen(message);
      // }
    });
    if (networkError) console.log(`Network Error: ${networkError}`);
  }
  console.log("These are gql errors: ", graphQLErrors);
  console.log(networkError);
});

//#############################################################################
const client = new ApolloClient({
  link: ApolloLink.from([
    // consoleLink,
    tokenRefreshLink,
    errorHandler,
    requestLink,
    // new HttpLink({
    //   uri: "http://localhost:4000/graphql",
    //   credentials: "include"
    // }),
    uploadLink,
  ]),
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
