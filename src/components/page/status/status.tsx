import * as React from "react";
import status from "./status.module.css";
import Box from "@mui/material/Box";
import TodoCard from "@/components/page/status/todoCard";
import Typography from "@mui/material/Typography";

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
  const todoStatusLabel = (todoStatus: number) => {
    let statusLabel:string = '';
    switch (todoStatus){
      case 0:
        statusLabel = '未対応'
        break;
      case 1:
        statusLabel = '処理中'
        break;
      case 2:
        statusLabel = '完了'
        break;
    }
    return statusLabel;
  }

  return (
      <>
        <Box className={status.container} >
          {
            TODO_STATUS.map((todoStatus) => (
              <>
                <Typography sx={{ margin: 1}} variant="h6">{todoStatusLabel(todoStatus)}</Typography>
                <Box className={status.item} >
                  {
                    props.todoList.map((todo,index) => (
                      <TodoCard todo={todo} todoStatus={todoStatus} />
                    ))
                  }
                </Box>
              </>
            ))
          }
        </Box>
      </>
  )

}