import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useField } from "formik";
import { FC, InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name : string;
    label : string;
};

export const InputField:FC<InputFieldProps> = ({label,
    size:_,
    ...props}) => {

  const [field,{error}] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field
    .name} placeholder={props.placeholder} />
     {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
