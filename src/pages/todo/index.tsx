import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import {Layout} from "@/components/ui/layout/Layout";
import TodoPage from "@/components/page/todo";

export default function Todo() {
  return (
      <Layout>
          <TodoPage/>
      </Layout>
  )
}
