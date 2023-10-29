import Head from "next/head";
import {
    Flex, 
    Text,
    Heading,
    Button,
    Link as ChakraLink,
    useMediaQuery,
    Box,
} from "@chakra-ui/react";

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Sidebar } from "@/src/components/sidebar";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";


export default function Dashboard() {

    const [isMobile] = useMediaQuery("(max-width: 550px)")

    return(
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Sidebar>
                <Flex direction={"column"} align={"flex-start"} justify={"flex-start"}>
                    <Flex w={100} direction={"row"} align={"center"} justify={"flex-start"}>
                        <Heading fontSize={"3xl"} mt={4} mb={4} mr={4} color={"white"}>
                            Agenda
                        </Heading>
                        <Link href={"/new"}>
                            <Button>
                                Registrar
                            </Button>
                        </Link>
                    </Flex>
                    <Box w="100%">
                    <ChakraLink
                        w="100%"
                        m={0}
                        p={0}
                        mt={0}
                        bg="transparent"
                        style={{ textDecoration: "none" }}
                    >
                        <Flex 
                        w="100%" 
                        direction={isMobile ? "column" : "row"}
                        p={4}
                        rounded={4}
                        mb={4}
                        bg="barber.400"
                        justify={"space-between"}
                        align={isMobile ? "flex-start" : "center"}
                        >
                            <Flex direction={"row"} mb={isMobile ? 2 : 0} align={"center"} justify={"center"}>
                                <IoMdPerson size={28} color="orange"/>
                                <Text color={"white"} fontWeight={"bold"}  noOfLines={6}>Thiarly Cavalcante</Text>
                            </Flex>

                            <Text color={"white"} fontWeight={"bold"} mb={isMobile ? 2 : 0}>Corte completo</Text>
                            <Text color={"white"} fontWeight={"bold"} mb={isMobile ? 2 : 0}>R$ 40.50</Text>

                        </Flex>
                    </ChakraLink>
                    </Box>

                </Flex>
            </Sidebar>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {

        }
    }
})

