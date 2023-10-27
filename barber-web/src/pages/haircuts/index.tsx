import { useState } from 'react';
import Head from 'next/head';
import { Sidebar } from '../../components/sidebar'
import {
  Flex,
  Text,
  Heading,
  Button,
  Stack,
  Switch,
  useMediaQuery,
  Box
} from '@chakra-ui/react'

import Link from 'next/link';

import { IoMdPricetag } from 'react-icons/io'
import { canSSRAuth } from '@/src/utils/canSSRAuth';
import { setupAPIClient } from '@/src/services/api';


interface HaircutsItem{
    id: string;
    name: string;
    price: number | string;
    status: boolean;
    user_id: string;
}

interface HaircutsProps{
    haircuts: HaircutsItem[];
}


export default function Haircuts( {haircuts}: HaircutsProps ){

  const [isMobile] = useMediaQuery("(max-width: 550px)")

  const [haircutList , setHaircutList] = useState<HaircutsItem[]>(haircuts || [])

  return(
    <>
      <Head>
        <title>Modelos de corte - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
         
         <Flex
          direction={isMobile ? 'column' : 'row'}
          w="100%"
          alignItems={isMobile ? 'flex-start' : 'center'}
          justifyContent="flex-start"
          mb={0}
         >
          <Heading
            fontSize={isMobile ? '28px' : "3xl"} 
            mt={4} 
            mb={4}
            mr={4}
            color="orange.900"
          >
            Modelos de corte
          </Heading>

          <Link href="/haircuts/new">
            <Button bg={"barber.100"}>
              Cadastrar novo
            </Button>
          </Link>

          <Stack ml="auto" align="center" direction="row">
            <Text fontWeight="bold">ATIVOS</Text>
            <Switch
              colorScheme="green"
              size="lg"
            />
          </Stack>

         </Flex>

          {haircutList.map(haircut => (
            
         <Box w="100%">
         <Link key={haircut.id}  href={`/haircuts/${haircut.id}`}>
             <Flex
             cursor="pointer"
             w="100%"
             p={4}
             bg="barber.400"
             direction="row"
             rounded="4"
             mb={2}
             justifyContent="space-between"
             >

             <Flex direction="row" alignItems="center">
                 <IoMdPricetag size={28} color="#fba931"/>
                 <Text fontWeight="bold" ml={4} noOfLines={2} color="white">
                    {haircut.name}
                 </Text>
             </Flex>

             <Text fontWeight="bold" color="white" alignSelf="center">
                Preço: R$ {haircut.price}
             </Text>

             </Flex>
         </Link>
        </Box>
        ))}
       



        </Flex>
      </Sidebar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    try{
        const api = setupAPIClient(ctx);
        const response = await api.get('/haircuts',
        {
            params: {
                status: true,
            }
        });

        if (response.data === null){
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
            }   }
        }

        return {
            props: {
                haircuts: response.data
            }
        }

    }catch(err){
        console.log(err);
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }
})