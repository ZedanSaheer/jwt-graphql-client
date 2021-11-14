import { Button } from "@chakra-ui/button";
import { Box, Link } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import { FC } from "react";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMaps";
import NextLink from "next/link"
import { route } from "next/dist/server/router";

const Login:FC<{}> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (value, { setErrors }) => {
          const response = await login(value);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
           if (typeof router.query.next === "string") {
             router.push(router.query.next);
           } else {
             router.push("/");
           }
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <InputField
                name="usernameOrEmail"
                placeholder="Username or Email"
                label="Username or Email"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Box mt={4}>
              <NextLink href="/forgot-password">
                  <Link color="teal">
                  Forgot password?
                  </Link>
              </NextLink>
              </Box>
              <Button
                type="submit"
                mt={4}
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Login
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
