import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import React, { FC } from "react";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

export const CreatePost: FC<{}> = ({}) => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ title : "",text :"" }}
        onSubmit={async (value) => {
          console.log(value);
          
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <InputField
                name="Title"
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
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);