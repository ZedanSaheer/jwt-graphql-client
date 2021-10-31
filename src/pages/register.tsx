import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper";

const Register = () => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(value) => {
          console.log(value);
        }}
      >
        {({isSubmitting }) => {
          return (
            <Form>
              <InputField
                name="username"
                placeholder="Username"
                label="Username"
              />
             <Box mt={4}>
             <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
             </Box>
             <Button type="submit" mt={4} isLoading={isSubmitting} colorScheme="teal">Register</Button>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default Register;
