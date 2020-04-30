import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { Redirect, Route } from "react-router-dom";

export const AuthRoute = (props: any) => {
  const { component, ...rest } = props;
  const { data } = useMeQuery();
  const renderRoute = (routeProps: any) => {
    console.log("AuthRoute 9: ", data);
    if (!data) {
      //loading screen
      return null;
    }
    if (!data.me || !data.me.user) {
      return <Redirect to="/login" />;
    }
    const Component = component as any;
    return <Component {...routeProps} />;
  };

  return <Route {...rest} render={renderRoute} />;
};
