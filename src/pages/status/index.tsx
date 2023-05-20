import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import {Layout} from "@/components/ui/layout/Layout";
import TodoStatus from "@/components/page/status";

export default function Todo() {
  return (
      <Layout>
          <TodoStatus/>
      </Layout>
  )
}
