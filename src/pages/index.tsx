import type { NextPage } from 'next'
import Navbar from '../components/Navbar'

import {withUrqlClient} from "next-urql"
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'

const Home: NextPage = () => {

  const [{data}] = usePostsQuery();

  return (
    <>
      <Navbar/>
      <div>Hello World</div> <br />
      {data && data.posts.map((p)=>(<div key={p}>{p.title}</div>))}
    </>
  )
}

export default withUrqlClient(createUrqlClient)(Home)  
