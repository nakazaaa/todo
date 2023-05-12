import Link from 'next/link'
import {useEffect, useState} from "react";
import {Button, Card, CardContent} from '@mui/material'
import * as React from "react";
import customAxios from "@/lib/customAxios";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import status from "./status.module.css";

type TodoListDataEntity = {
  id:number,
  status:number,
  title:string,
  text:string,
}
type Props = {
  todoList:TodoListDataEntity[],
}
export default function Status(props:Props) {

    return (
        <>
          <Grid container spacing={{ xs: 2 }} columns={{ xs: 2, md: 6 }}>
            {props.todoList.map((todo,index) => (
              <Grid item xs={2} key={index}>
                if (todo.status === 1) {
                <Card sx={{ maxWidth: 345 }} >
                  <CardContent>
                    <h1>
                      dddddd
                    </h1>
                  </CardContent>
                </Card>
              } else {
                <Card sx={{ maxWidth: 345 }} >
                  <CardContent>
                    <h1>
                      ggggg
                    </h1>
                  </CardContent>
                </Card>
              }
              </Grid>
            ))}
          </Grid>
        </>
    )
}
