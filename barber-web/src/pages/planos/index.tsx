import Head from 'next/head';

import {
    Button,
    Flex,
    Heading,
    Text,
    useMediaQuery,
} from '@chakra-ui/react';

import { Sidebar } from "../../components/sidebar";
import { color } from 'framer-motion';

export default function Planos() {
    const [isMobile] = useMediaQuery("(max-width: 550px)")

    return(
        <>
            <Head>
                <title>Barber | Planos</title>
            </Head>
                <Sidebar>
                    <Flex w={"100%"} direction={'column'} align={'flex-start'} justify={'flex-start'}>
                        <Heading color={"white"} fontSize={"3xl"} mt={4} mr={4} mb={4}>
                            Planos
                        </Heading>
                    </Flex>
                    <Flex pb={8} maxW={"780px"} w={"100%"} direction={"column"} justify={'flex-start'}>

                        <Flex w={"100%"} gap={4} flexDirection={isMobile ? "column" : "row"}>
                            <Flex rounded={4} p={4} flex={1} background={"barber.400"} flexDirection={"column"}>
                                <Heading
                                 color={"white"}
                                 textAlign={'center'}
                                    fontSize={"2xl"}
                                    mt={2} mb={2}
                                    color="gray.100"
                                >
                                    Planos Grátis
                                </Heading>
                                <Text color={"white"} ml={4} mb={4}>Registrar cortes</Text>
                                <Text color={"white"} ml={4} mb={4}>Criar apenas 3 modelos de corte</Text>
                                <Text color={"white"} ml={4} mb={4}>Editar dados do perfil</Text>
                                <Text color={"white"} ml={4} mb={4}>Consulta informações</Text>

                        </Flex>


                  
                            <Flex rounded={4} p={4} flex={1} background={"barber.400"} flexDirection={"column"}>
                                <Heading
                                 color={"white"}
                                 textAlign={'center'}
                                    fontSize={"2xl"}
                                    mt={2} mb={2}
                                    color="#31fb6a"
                                >
                                    Premium
                                </Heading>
                                <Text color={"white"} ml={4} mb={4}>Registrar cortes ilimitados</Text>
                                <Text color={"white"} ml={4} mb={4}>Criar modelos ilimitados</Text>
                                <Text color={"white"} ml={4} mb={4}>Editar modelos de corte</Text>
                                <Text color={"white"} ml={4} mb={4}>Consulta informações</Text>
                                <Text color={"white"} ml={4} mb={4}>Receber todas as atualizações</Text>
                                <Text color={"white"} ml={4} mb={4}>Suporte</Text>
                                <Text color={"white"} ml={4} mb={4}>Sem anúncios</Text>
                                <Text color={"#31fb6a"} fontSize={"lg"} fontWeight="bold" ml={4} mb={4}>R$ 9.99</Text>

                                <Button
                                    bg={"button.cta"}
                                    color={"#FFF"}
                                    mr={3}
                                    onClick={() => {}}
                                    _hover={{bg: "#31fb6a", color: "gray.900"}}
                                    
                                >
                                    Assinar
                                </Button>
                            </Flex>


                        </Flex>

                    </Flex>
                </Sidebar>
        </>
    )

    
}