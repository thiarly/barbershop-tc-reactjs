import { useContext, useState } from "react";
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
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { AuthContext } from "@/src/context/AuthContext";
import { setupAPIClient } from "@/src/services/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface UserProps{
    id: string;
    name: string;
    email: string;
    endereco: string | null;
}

interface ProfileProps{
    user: UserProps;
    premium: boolean;
}

export default function Profile({ user, premium }: ProfileProps){
    console.log(user)

    const { logoutUser } = useContext(AuthContext);

    const [name, setName] = useState(user && user?.name)
    const [endereco, setEndereco] = useState(user?.endereco || "")


    async function handleLogout(){
        await logoutUser();
    }

    async function handleUpdateUser(){
        if (name === ""){
            return;
        }
        try{
            const apiCliente = setupAPIClient();
            await apiCliente.put('/users', {
                name: name,
                endereco: endereco
            })
            toast.success("Dados atualizados com sucesso!")

        }catch(err){
            console.log(err)
        }

    }
    
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
                            color={"gray.100"}
                            placeholder="Nome da sua Barbearia"
                            size={"lg"}
                            type="text"
                            mb={"6"}
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                        />
                        <Text color={"white"} fontSize={"xl"} fontWeight={"bold"} mb={"2"}>
                            Endereço</Text>
                        <Input
                            w={"100%"}
                            background={"gray.900"}
                            color={"gray.100"}
                            placeholder="Endereço da Barbearia"
                            size={"lg"}
                            type="text"
                            mb={"6"}
                            value={endereco}
                            onChange={(e)=> setEndereco(e.target.value)}
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
                            <Text p={"2"} fontSize={"lg"} color={premium ? "#FBA931" : "#4dffb4"}>
                                Plano {premium ? "Premium" : "Grátis"}
                            </Text>
                            
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
                            onClick={handleUpdateUser}
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
                            onClick={handleLogout}

                        >
                            Sair da conta
                        </Button>
                    </Flex>
                </Flex>
            </Sidebar>
            <ToastContainer />
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    try{
        const apiCliente = setupAPIClient(ctx);
        const response = await apiCliente.get('/me');

        const user={
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            endereco: response.data.endereco ?? null,
        }

        return{
            props: {
                user: user,
                premium: response.data?.subscriptions?.status === "active" ? true : false

            }
        }

        }catch(err){
            console.log(err);

        return{
            redirect:{
                destination: '/dashboard',
                permanent: false,
            }
        }
    }
})