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




export default function Haircuts(){

  const [isMobile] = useMediaQuery("(max-width: 550px)")

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


         <Box w="100%">
            <Link href="/haircuts/123">
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
                    Corte completo
                    </Text>
                </Flex>

                <Text fontWeight="bold" color="white" alignSelf="center">
                    Preço: R$ 59.90
                </Text>

                </Flex>
            </Link>
        </Box>          



        </Flex>
      </Sidebar>
    </>
  )
}