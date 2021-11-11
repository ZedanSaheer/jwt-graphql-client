import { Box } from "@chakra-ui/layout"
import { FC } from "react"

export type WrapperVariant = 'small' | 'regular'

interface WrapperProps{
    variants? : WrapperVariant;
}

const Wrapper  : FC<WrapperProps> = ({children,variants='regular'}) => {
    return (
       <Box maxWidth={variants === 'regular' ? '800px' : '400px'} w="100%" mt={8} mx="auto">
           {children}
       </Box>
    )
}

export default Wrapper
