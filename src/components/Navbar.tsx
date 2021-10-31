import { Box, Flex, Link } from "@chakra-ui/layout";
import { FC } from "react";
import NextLink from "next/link"
import { useMeQuery } from "../generated/graphql";
import { Button } from "@chakra-ui/button";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {

    const [{data,fetching}] = useMeQuery();
    let body = null
    if(fetching){
        body = null;
    }else if(!data?.me){
        body = (
            <>
            <NextLink href="/login">
            <Link mr="4" color="black">
               Login
             </Link>
            </NextLink>
            <NextLink href="/register">
            <Link mr="4" color="black">
               Register
             </Link>
            </NextLink>
            </>
        )
    }else{
        body = (
            <Flex>
                <Box color="black">
                {data.me.username}
                <Button variant="link" ml={4}>
                    Logout
                </Button>
            </Box>
            </Flex>
        )
    }

  return (
    <Flex bg="lightcyan" p={4}>
      <Box ml={"auto"}>
        {body}
      </Box>
    </Flex>
  );
};

export default Navbar;
