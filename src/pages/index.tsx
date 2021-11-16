import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import NextLink from "next/link";
import { Stack } from "@chakra-ui/react";
import { useState } from "react";

const Home = () => {
  const [variables , setVariables] = useState({
    limit : 10,cursor:null as null | string
  })
  const [{ data, fetching }] = usePostsQuery ({
    variables,
  });

  if(!data && !fetching) {
    return <>Your query failed , try again later</>
  }

  console.log(variables);
  

  return (
    <Layout>
      <Flex>
      <NextLink href="/create-post">
        <Link ml="auto" my={4}>Create Post</Link>
      </NextLink>
      </Flex>
      {!data && fetching ? (
        "Loading..."
      ) : (
        <Stack spacing={8}>
          {data?.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading>{p.title}</Heading>
              <Text>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data && <Flex>
        <Button my={4} mx="auto" 
        onClick={()=>setVariables({
          limit : variables.limit, cursor : data.posts[data.posts.length-1].createdAt
        })} isLoading={fetching}>Load More</Button>
      </Flex>}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
