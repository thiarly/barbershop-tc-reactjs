import { useState } from "react";
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
import Router from "next/router";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import { api } from "@/src/services/apiClient";

interface NewHaircutProps{
    subscription: boolean;
    count: number;
}



export default function NewHaircut( { subscription, count }){

    console.log(subscription, count);


    const [isMobile] = useMediaQuery("(max-width: 550px)")

    const[name, setName] = useState("");
    const[price, setPrice] = useState("");

    async function handleClick(){
        if (name === "" || price === ""){
            return;
        }
        try{
            const apiClient = setupAPIClient();
            await apiClient.post('/haircut', {
                name: name,
                price: Number(price)
            })
            alert("Corte cadastrado com sucesso!")
            Router.push('/haircuts')
        }catch(err){
            console.log(err)
            alert("Erro ao cadastrar corte")
        }
    }

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
                        // Correção na propriedade disabled
                        <Input
                            placeholder="Nome do corte"
                            size={"lg"}
                            color={"gray.100"}
                            type="text"
                            w={"85%"}
                            bg="gray.900"
                            mb={"4"}
                            disabled={!subscription && count >= 3}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            placeholder="Valor do corte"
                            size={"lg"}
                            type="text"
                            color={"gray.100"}
                            w={"85%"}
                            bg="gray.900"
                            mb={"4"}
                            disabled={!subscription && count >= 3}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />   
                        <Button 
                            w={"85%"}
                            size={"lg"}
                            bg={"button.cta"}
                            color={"white"}
                            mb={"6"}
                            _hover={{ bg: '#ffb13e' }}
                            disabled={!subscription && count >= 3} // Ajustado aqui
                            onClick={handleClick}
                            
                        >
                            Cadastrar
                        </Button>

                        {! subscription && count >= 3 && (
                            <Flex>
                                <Text color={"white"} mr={"1"}>
                                    Você atingiu o limite cortes.
                                </Text>
                                <Link href={"/planos"}>
                                    <Text fontWeight={"bold"} color={"#31FB6A"} cursor={"pointer"}>
                                        Seja premium
                                    </Text>

                                </Link>
                            </Flex>    
                        )}
                    </Flex>
                </Flex>
            </Sidebar>
        </>
    )
        
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {
        const apiClient = setupAPIClient(ctx);

        const response = await apiClient.get('/haircut/check');
        console.log(response.data); // Adicionando o console.log aqui

        const count = await apiClient.get('/haircut/count');

        return {
            props: {
                subscription: response.data?.subscriptions?.status === 'active' ? true : false,
                count: count.data
            }
        }

    } catch (err) {
        console.log(err);

        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }
})
