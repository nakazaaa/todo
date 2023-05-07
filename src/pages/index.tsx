import {Layout} from '@/components/ui/layout/Layout'
import {useEffect} from "react";
import customAxios from "@/lib/customAxios";
import {useRouter} from "next/router";


export default function Home() {
    const router = useRouter()
    useEffect(() =>{
        customAxios.get(process.env.NEXT_PUBLIC_API_HOST+'/api/me').then((response) => {
            router.push('/todo')
        }).catch(() => {
                router.push('/login')
            }
        )},[])

    return (
            <>
            </>

    )
}
