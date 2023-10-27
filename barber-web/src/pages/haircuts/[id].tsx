import Head from "next/head";
import { 
    Flex,
    Text, 
    Heading,
    Button,
    useMediaQuery,
    Input,
    Stack,
    Switch,
} from "@chakra-ui/react";

import { Sidebar } from '../../components/sidebar'
import { FiChevronsLeft } from "react-icons/fi";
import Link from "next/link";

export default function EditarHaircut(){
    const [isMobile] = useMediaQuery("(max-width: 550px)")
    return(
        <>
            <Head>
                <title>Editar modelo de corte - Minha barbearia</title>
            </Head>
                <Sidebar>
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
                            Editar corte
                        </Heading>
                </Flex>
                <Flex maxW={"700px"} pt={8} pb={8} w="100%" bg="barber.400" direction={"column"} align={"center"} justify={"center"}>
                <Heading 
                            color="gray.100"
                            fontSize={isMobile ? "2xl" : "4xl"}
                            mb={4}
                            mr={4}
                        >
                            Editar corte
                </Heading>
                <Flex w="85%" direction={"column"}>
                    <Input
                        placeholder="Nome do corte"
                        size={"lg"}
                        mb={"4"}
                        color={"gray.100"}
                        type="text"
                        w={"100%"}

                    />
                     <Input
                        placeholder="Valor do corte"
                        size={"lg"}
                        mb={"3"}
                        color={"gray.100"}
                        type="number"
                        w={"100%"}
                    />
                    
                    <Stack mb={6} align={"center"} direction={"row"}>
                        <Text color={"white"} fontWeight={"bold"}>Desativar corte</Text>
                        <Switch
                            size={"lg"}
                            colorScheme="red"
                        />
                    </Stack>
                    <Button
                        bg={"button.cta"}
                        size={"lg"}
                        w={"100%"}
                        color={"gray.900"}
                        _hover={{bg: "#FFb13e"}}
                        mb={"6"}
                    >Salvar</Button>
                </Flex>
                
                </Flex>
                </Sidebar>
            
        </>
    )
}