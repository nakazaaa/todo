import * as React from "react";
import {Button, ButtonProps, DialogTitle, Stack, TextField} from "@mui/material";

export  const CustomButton = (props:ButtonProps) => {
  const { children,onClick,sx = { marginLeft: 10 ,marginRight:10 ,marginBottom:5} ,color} = props;
  return (
      <Button sx={sx} color={color} onClick={onClick}>{children}</Button>
  )
}
