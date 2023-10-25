import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Sidebar } from "@/src/components/sidebar";

export default function Dashboard() {
    return(
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Sidebar>
                <Flex>
                    <Text>Bem vindo ao Dashboard</Text>
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

