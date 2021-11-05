import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import router from "next/dist/client/router";
import React from "react";
import { InputField } from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMaps";
import login from "../login";

const ChangePassword : NextPage<{token:string}> = ({token}) => {
    return (
        <Wrapper>
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (value, { setErrors }) => {
            const response = await login(value);
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <Box mt={4}>
                  <InputField
                    name="newPassword"
                    placeholder="New Password"
                    label="New Password"
                    type="password"
                  />
                </Box>
                <Button
                  type="submit"
                  mt={4}
                  isLoading={isSubmitting}
                  colorScheme="teal"
                >
                  Change Password
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Wrapper>
    );
}

ChangePassword.getInitialProps = ({query}) => {
    return {
        token: query.token as string
    }
}

export default ChangePassword