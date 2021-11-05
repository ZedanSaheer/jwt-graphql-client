import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMaps";

const Register = () => {
  const [, register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (value, { setErrors }) => {
          const response = await register({ options: value });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <InputField
                name="username"
                placeholder="Username"
                label="Username"
              />
              <Box mt={4}>
                <InputField name="email" placeholder="Email" label="email" />
              </Box>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button
                type="submit"
                mt={4}
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Register
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
