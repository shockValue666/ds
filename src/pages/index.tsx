// import type { NextPage } from "next";
// import Head from "next/head";
// import { HomeView } from "../views";

// const Home: NextPage = (props) => {
//   return (
//     <div>
//       <Head>
//         <title>Solana Scaffold</title>
//         <meta
//           name="description"
//           content="Solana Scaffold"
//         />
//       </Head>
//       <HomeView />
//     </div>
//   );
// };

// export default Home;

// import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user.id} session={session} />
      )}
    </div>
  )
}
