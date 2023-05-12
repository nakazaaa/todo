import React, {SetStateAction, useContext, useEffect, useState} from "react";
import customAxios from "@/lib/customAxios";
import GlobalProvider, {GlobalState} from "@/context/GlobalProvider";
import Status from "@/components/page/status/status";


export default function TodoStatus() {
    type PostData = {
        title:string,
        text:string,
        time:number,
        status:number,
    }
    const {loading,dialog} = useContext(GlobalState);
    const [todoList,setTodoList] = useState([]);

    useEffect(() =>{
        loading.set(true);
        getTodoList().then(() => {
            loading.set(false);
        });
    },[]);

    const getTodoList = async (): Promise<void> => {
         await customAxios.get(process.env.NEXT_PUBLIC_API_HOST+'/api/todo')
          .then((response) => {
            setTodoList(response.data.todos);
        })
    };

    return (
        <>
            <Status todoList={todoList}/>
        </>
    )
}
