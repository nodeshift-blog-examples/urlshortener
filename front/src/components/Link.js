import React from "react";
import { Link as RouterLink } from "react-router-dom";

function Link (props) {
  if (props.external) {
    return (
      <a href={props.to} target="_blank" rel="noreferrer noopener">{props.children}</a>
    );
  }

  return (
    <RouterLink to={props.to}>{props.children}</RouterLink>
  );
}

export default Link;