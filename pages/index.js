'useclient'

import { useEffect } from 'react';
import Router from "next/router";

export default function Home({ user }) {
  useEffect(() => {
    user ? Router.push('/chat') : Router.push('/signin')
  }, [])
  return (
    <>
    </>
  )
}
