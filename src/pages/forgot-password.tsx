import { Box, Link } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import router from 'next/dist/client/router';
import React, { useState } from 'react'
import { InputField } from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMaps';
import login from './login';
import NextLink from "next/link"
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword : React.FC<{}> = ({}) => {

    const [complete,setComplete] = useState(false);
    const [email , setEmail] = useState("");
    const [,forgotPassword] =useForgotPasswordMutation()

    return (
        <Wrapper>
      <Formik
        initialValues={{ email: ""}}
        onSubmit={
            async(values)=>
            {
                await forgotPassword(values);
                setComplete(true);
                setEmail(email);
            }
        }
      >
        {({ isSubmitting }) => complete ? 
        (<Box color="teal" textTransform=
    "capitalize">Email confirmation sent. if you have an account please check inbox!</Box>)
        :(
(
    <Form>
      <InputField
        name="email"
        placeholder="Email"
        label="Email"
      />
      <Button
        type="submit"
        mt={4}
        isLoading={isSubmitting}
        colorScheme="teal"
      >
        Send Confirmation
      </Button>
    </Form>
  )
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);

