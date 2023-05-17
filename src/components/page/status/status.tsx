import * as React from "react";
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
const TODO_STATUS = [0, 1, 2] as const;

export default function Status(props:Props) {
  return (
      <>
        <Box className={status.container} >
          {
            TODO_STATUS.map((todoStatus) => (
                <Box className={status.item} >
                  {
                    props.todoList.map((todo,index) => (
                        <TodoCard todo={todo} todoStatus={todoStatus} />
                    ))
                  }
                </Box>
            ))
          }
        </Box>
      </>
  )

}