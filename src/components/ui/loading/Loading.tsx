import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from "react";
import {useContext, useState} from "react";
import {loadingContext} from "@/pages/_app";


export  const Loading = () => {
  const {open,setOpen} = useContext(loadingContext);
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
