import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import React, { FC, useEffect } from "react";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { Router, useRouter } from "next/dist/client/router"; 
import { Layout } from "../components/Layout";

export const CreatePost: FC<{}> = ({}) => {

    const [,createPost] = useCreatePostMutation();
    const [{data,fetching}] = useMeQuery();
    const router = useRouter();

    useEffect(() => {
        if(!data?.me && !fetching){
            router.replace("/login");
        }
    }, [fetching,data,router])

  return (
    <Layout>
      <Formik
        initialValues={{ title : "",text :"" }}
        onSubmit={async (value) => {
          const {error} = await createPost({input:value});
         if(!error){
             router.push("/");
         }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <InputField
                name="title"
                placeholder="Title"
                label="Title"
              />
              <Box mt={4}>
                <InputField
                  name="text"
                  placeholder="Text"
                  label="Text"
                  textarea
                />
              </Box>
              <Button
                type="submit"
                mt={4}
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Create Post
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);