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
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";


interface HaircutProps{
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface SubscriptionProps{
    id: string;
    status: string;
}


interface EditHaircutProps{
    haircut: HaircutProps;
    subscription: SubscriptionProps | null;
}


export default function EditarHaircut({ subscription, haircut}){
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
                        disabled={subscription?.status !== "active"}

                    />
                     <Input
                        placeholder="Valor do corte R$ 45.90"
                        size={"lg"}
                        mb={"3"}
                        color={"gray.100"}
                        type="number"
                        w={"100%"}
                        disabled={subscription?.status !== "active"}
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
                        disabled={subscription?.status !== "active"}
                    >Salvar</Button>

                    {subscription?.status !== "active" && (
                        <Flex direction={"row"} align={"center"} justify={"center"}>
                            <Link href={"/planos"}>
                                <Text fontWeight={"bold"} mr={1} color={"#31fb6a"} cursor={"pointer"}>  
                                    Seja premium
                                </Text>
                            </Link>
                            <Text color={"white"}>
                                e tenha todos acessos liberados.
                            </Text>
                        </Flex>
                    )}


                </Flex>
                
                </Flex>
                </Sidebar>
            
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const { id } = ctx.params;
    
    try{
        const apiClient = setupAPIClient(ctx);

        const check = await apiClient.get('/haircut/check');

        const response = await apiClient.get('/haircut/detail',{
            params: {
                haircut_id: id,
            }
        });
        
        return {
            props: {
                haircut: response.data,
                subscription: check.data?.subscriptions,
            }
        }

    }catch(err){
        console.log(err);

        return {
            redirect: {
                destination: '/haircuts',
                permanent: false,
            }
        }
    }
  });