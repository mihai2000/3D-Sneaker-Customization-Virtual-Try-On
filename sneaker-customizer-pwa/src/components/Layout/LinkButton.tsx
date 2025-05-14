import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { Button, ButtonProps } from "@mui/material";

type LinkButtonProps = ButtonProps & LinkProps;

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (props, ref) => {
    const { to, replace, state, ...buttonProps } = props;

    return (
      <Button
        {...buttonProps}
        component={Link}
        to={to}
        replace={replace}
        state={state}
        ref={ref}
      />
    );
  }
);

export default LinkButton;
