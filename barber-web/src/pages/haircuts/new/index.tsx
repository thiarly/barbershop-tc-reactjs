import Head from "next/head";
import { Sidebar } from "../../../components/sidebar";
import {
  Flex,
  Text,
  Heading,
  Box,
  Center,
  Input,
  Button,
  useMediaQuery,
} from '@chakra-ui/react'
import Link from "next/link";
import { FiChevronsLeft } from "react-icons/fi";


export default function NewHaircut(){
    const [isMobile] = useMediaQuery("(max-width: 550px)")

    return(
        <>
            <Head>
                <title>Cadastrar novo modelo de corte - Minha barbearia</title>
            </Head>
            <Sidebar>
                <Flex direction={"column"} alignContent={"flex-start"} justifyContent={"flex-start"}>
                    <Flex>
                        <Link href="/haircuts">
                            <Button 
                            bg={"barber.100"} 
                            alignItems={"center"} 
                            justifyItems={"center"} 
                            mr={4}
                            leftIcon={<FiChevronsLeft 
                            size={20}/>}>
                                Voltar
                            </Button>
                        </Link>
                        <Heading 
                            color="orange.900"
                            fontSize={isMobile ? "2xl" : "4xl"}
                            mb={4}
                            mr={4}
                        >
                            Modelos de corte
                        </Heading>
                    </Flex>
                    <Flex
                        maxW={isMobile ? "70%" : "700px"}
                        bg="barber.400"
                        w={"100%"}
                        align={"center"}
                        justify={"center"}
                        pt={8}
                        pb={8}
                        direction={"column"}
                    
                    >
                        <Heading mb={4} color="white" fontSize={isMobile ? "22px" : "3xl"}> Cadastrar modelo</Heading>
                        <Input
                            placeholder="Nome do corte"
                            size={"lg"}
                            color={"gray.100"}
                            type="text"
                            w={"85%"}
                            bg="gray.900"
                            mb={"4"}
                        >
                        </Input>
                        <Input
                            placeholder="Valor do corte"
                            size={"lg"}
                            type="text"
                            color={"gray.100"}
                            w={"85%"}
                            bg="gray.900"
                            mb={"4"}
                        >   
                        </Input>
                        <Button 
                        w={"85%"}
                        size={"lg"}
                        bg={"button.cta"}
                        color={"gray.900"}
                        mb={"6"}
                        _hover={{ bg: '#ffb13e' }}
                        >
                            Cadastrar
                        </Button>
                    </Flex>
                </Flex>
            </Sidebar>
        </>
    )
        
}