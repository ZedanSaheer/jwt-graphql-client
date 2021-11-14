import { Box, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMaps";
import NextLink from "next/link"

const ChangePassword : NextPage = () => {

    const [,changePassword] = useChangePasswordMutation();
    const router = useRouter();
    const [tokenError, setTokenError] = useState('');

    return (
        <Wrapper>
        <Formik
          initialValues={{ newPassword : "" }}
          onSubmit={async (value, { setErrors }) => {
            const response = await changePassword({newPassword : value.newPassword , token: typeof router.query.token === "string" ? router.query.token : ""});
            if (response.data?.changePassword.errors) {
              const errorMap = toErrorMap(response.data.changePassword.errors);
              if('token' in errorMap){
                setTokenError(errorMap?.token)
              }
              setErrors(errorMap);
              console.log(errorMap);
              
            } else if (response.data?.changePassword.user) {
              //worked
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
                {tokenError && (
               <Box>
                  <Box color="red">{tokenError}</Box>
                <NextLink href="/forgot-password">
                <Link color="teal">
                  Forgot again?
                </Link>
                </NextLink>
               </Box>
                )}
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

export default withUrqlClient(createUrqlClient)(ChangePassword);