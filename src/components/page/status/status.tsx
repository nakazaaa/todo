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
  todoList:TodoListDataEntity[],
}
export default function Status(props:Props) {

    return (
        <>
          {/*<Grid container spacing={{ xs: 2 }} columns={{ xs: 2, md: 6 }}>*/}
            <Box className={status.container} >
                <Box className={status.item} >
                    {props.todoList.map((todo,index) => (
                        (() => {
                            if (todo.status == 0) {
                                return(
                                    // <Box className={status.item} >
                                    <Card className={status.card} sx={{ maxWidth: 345 }} >
                                        <CardContent>
                                            {todo.title}
                                        </CardContent>
                                    </Card>
                                    // </Box>
                                );
                            }
                        })()
                    ))}
                </Box>
                <Box className={status.item} >
                    {props.todoList.map((todo,index) => (
                        (() => {
                            if (todo.status == 1) {
                                return(
                                    <Card className={status.card} sx={{ maxWidth: 345 }} >
                                        <CardContent>
                                            {todo.title}gg
                                        </CardContent>
                                    </Card>
                                );
                            }
                        })()
                    ))}
                </Box>
                <Box className={status.item} >
                    {props.todoList.map((todo,index) => (
                        (() => {
                            if (todo.status == 2) {
                                return(
                                    <Card className={status.card} sx={{ maxWidth: 345 }} >
                                        <CardContent>
                                            {todo.title}gg
                                        </CardContent>
                                    </Card>
                                );
                            }
                        })()
                    ))}
                </Box>
            </Box>

        </>
    )
}
