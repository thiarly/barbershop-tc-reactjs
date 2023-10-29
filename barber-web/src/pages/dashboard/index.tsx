import { useState } from "react";
import Head from "next/head";
import {
    Flex, 
    Text,
    Heading,
    Button,
    Link as ChakraLink,
    useMediaQuery,
    Box,
    useDisclosure,
} from "@chakra-ui/react";

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Sidebar } from "@/src/components/sidebar";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";
import { setupAPIClient } from '../../services/api'
import { ModalInfo } from "@/src/components/modal";


export interface ScheduleItem {
    id: string;
    customer: string;
    haircut: {
        id: string;
        name: string;
        price: number;
        user_id: string;
    }
}
interface DashboardProps {
    schedule: ScheduleItem[];
}

export default function Dashboard({ schedule }: DashboardProps) {
    const [list, setList] = useState(schedule)
    const [service, setService] = useState<ScheduleItem>()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isMobile] = useMediaQuery("(max-width: 550px)")

    function handleOpenModal(item: ScheduleItem){
        setService(item)
        onOpen()
    }

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

                   
                    {list.map((item) => (
                        <Box w="100%">
                        <ChakraLink 
                            onClick={ () => handleOpenModal(item) }
                            key={item?.id}
                            w="100%"
                            m={0}
                            p={0}
                            mt={1}
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
                                <Flex direction={"row"} mb={isMobile ? 2 : 0} align={"start"} justify={"start"} flexShrink={0}>
                                    <IoMdPerson size={28} color="orange"/>
                                    <Text color={"white"} fontWeight={"bold"} noOfLines={1}>
                                        {item?.customer}
                                    </Text>
                                </Flex>

                                <Flex direction={"column"} align={"center"} justify={"center"} flexShrink={0}>
                                    <Text color={"white"} fontWeight={"bold"} mb={isMobile ? 2 : 0}>
                                        {item?.haircut?.name}
                                    </Text>
                                </Flex>
                                <Flex direction={"column"} align={"center"} justify={"center"} flexShrink={0}>
                                    <Text color={"white"} fontWeight={"bold"}>
                                        R$ {item?.haircut?.price}
                                    </Text>
                                </Flex>
                            </Flex>
                        </ChakraLink>
                        </Box>
                    ))}

                </Flex>
            </Sidebar>
            <ModalInfo
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                data={service}
                finishService={async () => {}}
            />
            
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {

    try{
        const apiClient = setupAPIClient(ctx)
        const response = await apiClient.get('/schedule')

        return {
            props: {
                schedule: response.data,
            }
        }

    }catch(err){
        console.log(err)
        return {
            props: {
                schedule: []
            }
        }
    }

})

