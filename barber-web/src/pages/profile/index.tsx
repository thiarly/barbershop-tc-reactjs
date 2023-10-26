import Head  from "next/head";
import{
Flex,
Text,
Heading,
Box,
Center,
Input,
Button
} from '@chakra-ui/react'
import { Sidebar } from "../../components/sidebar";
import Link from "next/link";

export default function Profile(){
    return(
        <>
            <Head>
                <title>Minha Conta - BarberPRO</title>
            </Head>
            <Sidebar>
                <Flex direction={"column"} alignItems={"flex-start"} justifyContent={"flex-start"}>
                    <Flex w="100%" direction={"row"} alignItems={"center"} justifyContent={"flex-start"}>
                        <Heading color="orange.900" fontSize={"4xl"}>Minha conta</Heading>
                    </Flex>
                </Flex>

                <Flex pt={8} pb={8} background={"barber.400"} maxW={"700px"} w="100%" direction={"column"} alignItems={"center"} justifyContent={"center"}>
                    <Flex direction={"column"} w={"85%"}>
                        <Text color={"white"} fontSize={"xl"} fontWeight={"bold"} mb={"2"}>
                            Nome da Barbearia</Text>
                        <Input
                            w={"100%"}
                            background={"gray.900"}
                            placeholder="Nome da sua Barbearia"
                            size={"lg"}
                            type="text"
                            mb={"6"}
                        />
                        <Text color={"white"} fontSize={"xl"} fontWeight={"bold"} mb={"2"}>
                            Endereço</Text>
                        <Input
                            w={"100%"}
                            background={"gray.900"}
                            placeholder="Endereço da Barbearia"
                            size={"lg"}
                            type="text"
                            mb={"6"}
                        />
                        <Text color={"white"} fontSize={"xl"} fontWeight={"bold"} mb={"2"}>
                            Plano Atual:
                        </Text>

                        <Flex
                            direction={"row"} 
                            w={"100%"} mb={"1"} 
                            rounded={"6"} 
                            background={"barber.900"} 
                            alignItems={"center"} 
                            justifyContent={"space-between"}
                            >
                            <Text color={"#4dffb4"} p={"2"} fontSize={"lg"}>Plano Grátis</Text>
                            
                            <Link href="/planos">
                                <Box 
                                color={"white"} 
                                cursor={"pointer"} 
                                p={"1"} 
                                pl={"2"} 
                                pr={"2"} 
                                background={"#00cd52"} 
                                rounded={4}>
                                    Mudar Plano
                                </Box>
                            </Link>
                        </Flex>
                        
                        <Button
                            w={"100%"}
                            mt={"3"}
                            mb={"4"}
                            bg={"button.cta"}
                            size={"lg"}
                            _hover={{ bg: '#ffb13e' }}
                        >
                            Salvar
                        </Button>

                        <Button
                            w={"100%"}
                            mb={"6"}
                            bg={"transparent"}
                            borderColor={"red.500"}
                            color={"red.500"}
                            borderWidth={2}
                            size={"lg"}
                            _hover={{ bg: 'transparent' }}

                        >
                            Sair da conta
                        </Button>
                    </Flex>
                </Flex>
            </Sidebar>
        </>
    )
}