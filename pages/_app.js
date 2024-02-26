import '@/styles/globals.css'
import Head from 'next/head'
import '@/styles/styles.css'
import { parseCookies, destroyCookie } from "nookies";
import { redirectUser } from "@/utils/auth";
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';

export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <title>Sekhar</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {/* <link rel="icon" href="../images/rsb-logo.png" /> */}

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
      />
    </Head>
    <Component {...pageProps} />
  </>
}

App.getInitialProps = async ({ Component, ctx }) => {

  const { user_token } = parseCookies(ctx);

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (!user_token) {
    // if a user not logged in then user can't access those pages
    const isProtectedRoute =
      ctx.pathname === "/chat"
    if (isProtectedRoute) {
      redirectUser(ctx, "/");
    }

  } else {
    // if a user logged in then user can't access those pages
    const ifLoggedIn =
      ctx.pathname === "/signin";
    if (ifLoggedIn) {
      redirectUser(ctx, "/");
    }

    try {
      const payload = { headers: { Authorization: user_token } };
      const url = `${baseUrl}/api/users/getUser`;
      const response = await axios.get(url, payload);
      const user = response && response.data.user;

      if (!user) {
        destroyCookie(ctx, "lisbo_users_token");
        redirectUser(ctx, "/signin");
      }
      pageProps.user = user;      
    } catch (err) {
      destroyCookie(ctx, "user_token");
    }
  }
  return {
    pageProps,
  };
};