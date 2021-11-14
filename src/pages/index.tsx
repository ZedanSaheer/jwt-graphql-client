import type { NextPage } from 'next'
import Navbar from '../components/Navbar'

import {withUrqlClient} from "next-urql"
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'
import { Layout } from '../components/Layout'
import { Link } from '@chakra-ui/layout'
import NextLink from "next/link"

const Home: NextPage = () => {

  const [{data}] = usePostsQuery();

  return (
    <Layout>
     <NextLink href="/create-post">
     <Link>
      Create Post
      </Link>
     </NextLink>
      <br />
      <br />
      <br />
      {data && data.posts.map((p)=>(<div key={p.id}>
        <div>{p.title}</div><br/>
        </div>))}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient,{ssr:true})(Home)  
