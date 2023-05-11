import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from "react";
import {useContext, useState} from "react";
import {GlobalState} from "@/context/GlobalProvider";


export  const Loading = () => {
  const {loading} = useContext(GlobalState);
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading.isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
