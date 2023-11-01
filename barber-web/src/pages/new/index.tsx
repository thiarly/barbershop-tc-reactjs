import Head from 'next/head';
import { useState, ChangeEvent } from 'react';
import { Sidebar } from '../../components/sidebar'
import {
  Flex,
  Heading,
  Button,
  Input,
  Select,
  Box,
  Text,
} from '@chakra-ui/react'
   
import { canSSRAuth } from '@/src/utils/canSSRAuth';
import { setupAPIClient } from '@/src/services/api';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface HaircutProps{
    id: string;
    name: string;
    price: string | number;
    status: boolean;
    user_id: string;
}

interface NewProps{
    haircuts: HaircutProps[];
}

 
export default function New( {haircuts}: NewProps ) {

    const [customer , setCustomer] = useState('')
    const [haircutSelected, setHaircutSelected] = useState(haircuts[0])
    const router = useRouter()

    function handleChangeSelect(id: string){
        const haircutItem = haircuts.find( item => item.id === id)
        setHaircutSelected(haircutItem)

    }

    async function handleRegister(){

        if (customer === ""){
            alert("Preencha o nome do cliente")
            return;
        }

        try{
            const apiClient = setupAPIClient();
            await apiClient.post('/schedule', {
                customer,
                haircut_id: haircutSelected?.id,
            })
            toast.success("Agendamento cadastrado com sucesso!")


        }catch(err){
            console.log(err)
            toast.error("Erro ao cadastrar agendamento")
        }
    }

    const clearInputs = () => {
        setCustomer("");
    };

    return (
        <>
            <Head>
                <title>BarberTC - Novo Agendamento</title>
            </Head>
            <Sidebar>
                <Flex
                    
                    w={'100%'}
                    
                    justify={'center'}
                    direction="column" alignItems="flex-start" justifyContent="flex-start"
                >
                    <Heading fontSize={"3xl"} mt={4} mb={4} mr={4} color={"white"}>
                        Novo Agendamento
                    </Heading>
                </Flex>
                <Flex
                    maxW="700px"
                    pt={8}
                    pb={8}
                    width={'100%'}
                    direction={'column'}
                    align={'center'}
                    bg="barber.400"
                >
                    <Input
                        placeholder="Nome do Cliente"
                        size="lg"
                        width={'85%'}
                        bg="barber.900"
                        color="gray.100"
                        mb={5}
                        value={customer}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomer(e.target.value)}
                    >
                    </Input>
                
                    <Text color={'white'} mb={2}>Tipo de Serviço</Text>
                    <Select
                        id="haircutSelect"
                        bg={"barber.900"} 
                        mb={8}
                        size={"lg"}
                        w={"85%"} 
                        color={"gray.100"} 
                        onChange={(e) => handleChangeSelect(e.target.value)}
                    >
                        {haircuts.map(item => (
                            <option key={item?.id} value={item?.id} color='gray.100'>{item?.name}</option>
                        ))}
                    </Select>

                    <Button
                        placeholder="Nome do Cliente"
                        size="lg"
                        mb={4}
                        width={'85%'}
                        bg="button.cta"
                        color="gray.900"
                        _hover={{ bg: '#ffb13e' }}
                        onClick={handleRegister}
                    >
                        Cadastrar
                    </Button>
                    <Button
                            w={"85%"}
                            size={"lg"}
                            bg={"barber.100"} 
                            onClick={clearInputs}
                        >
                            Cadastrar novo
                    </Button>

                </Flex>
            </Sidebar>
            <ToastContainer />
        </>
    );
} 

export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {
        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get('/haircuts', {
            params: {
                status: true,
            }
        });

        if (response.data === null) {
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false
                  }
             }
        }

        // Presumindo que você queira retornar os dados como props
        return {
            props: {
                haircuts: response.data
            }
        };

    } catch (err) {
        console.log(err);
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        };
    }
});
