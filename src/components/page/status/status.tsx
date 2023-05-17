import Link from 'next/link'
import {useEffect, useState} from "react";
import {Button, Card, CardContent} from '@mui/material'
import * as React from "react";
import customAxios from "@/lib/customAxios";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import status from "./status.module.css";
import Box from "@mui/material/Box";
import TodoCard from "@/components/page/status/todoCard";

type TodoListDataEntity = {
  id:number,
  status:number,
  title:string,
  text:string,
}
type Props = {
  todoList:TodoListDataEntity[],
}

  const CARD_SX = { maxWidth: 345 } as const;

export default function Status(props:Props) {
  let completeList:TodoListDataEntity;
  let handleList:TodoListDataEntity;
  let notCompatibleList:TodoListDataEntity;

  const todoStatusDivide = () => {
    props.todoList.map((todo,index) => {
      if (todo.status === 0) {
        completeList = todo;
      }else if (todo.status === 1){
        let handleList = todo;
      }else if (todo.status === 2){
        let notCompatibleList = todo;
      }
    })
  }

  useEffect(()=> {
    todoStatusDivide();
  },[])

  return (
        <>
          {/*<Grid container spacing={{ xs: 2 }} columns={{ xs: 2, md: 6 }}>*/}
            <Box className={status.container} >
                    {props.todoList.map((todo,index) => (
                      <div>
                        <Box className={status.item} >
                          <TodoCard todo={todo} todoStatus={0} />
                        </Box>
                        {/*<Box className={status.item} >*/}
                        {/*  <TodoCard todo={todo} todoStatus={1} />*/}
                        {/*</Box>*/}
                        {/*<Box className={status.item} >*/}
                        {/*  <TodoCard todo={todo} todoStatus={2} />*/}
                        {/*</Box>*/}
                      </div>
                    ))}
            </Box>

        </>
    )
}
