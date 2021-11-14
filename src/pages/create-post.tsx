import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import React, { FC } from "react";
import { InputField } from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/dist/client/router";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

export const CreatePost: FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();

  return (
    <Layout>
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (value) => {
          const { error } = await createPost({ input: value });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <InputField name="title" placeholder="Title" label="Title" />
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
