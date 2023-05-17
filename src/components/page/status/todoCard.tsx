import Link from 'next/link'
import {useEffect, useState} from "react";
import {Button, Card, CardContent} from '@mui/material'
import * as React from "react";
import customAxios from "@/lib/customAxios";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import status from "./status.module.css";
import Box from "@mui/material/Box";

type TodoListDataEntity = {
  id:number,
  status:number,
  title:string,
  text:string,
}
type Props = {
  todo:TodoListDataEntity,
  todoStatus:number
}

  const CARD_SX = { maxWidth: 345 } as const;



export default function TodoCard(props:Props) {
  const {todo,todoStatus} = props;
  return (
        <>
          {
            todo.status === todoStatus ?
              <Card className={status.card} sx={CARD_SX} >
                <CardContent>
                  {todo.title}
                </CardContent>
              </Card>
              :
              <></>

          }

        </>
    )
}
