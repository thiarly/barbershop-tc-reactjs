import { useState, ChangeEvent } from 'react';
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
  Box,
  Input,
  Select,
} from '@chakra-ui/react'

import Link from 'next/link';


export default function New() {

    const [customer , setCustomer] = useState('')

    return (
        <>
            <Head>
                <title>BarberTC - Novo Agendamento</title>
            </Head>
            <Sidebar>
                <Flex
                    direction={'row'}
                    w={'100%'}
                    align={'center'}
                    justify={'center'}
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
                        mb={3}
                        value={customer}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomer(e.target.value)}
                    >
                    
                    </Input>

                    <Select bg={"barber.900"} mb={3} size={"lg"} w={"85%"} color={"gray.100"}>
                        <option key={1} value="Barber Completa" color='gray.100'>Corte Completo</option>
                    </Select>

                    <Button
                        placeholder="Nome do Cliente"
                        size="lg"
                        width={'85%'}
                        bg="button.cta"
                        color="gray.900"
                        _hover={{ bg: '#ffb13e' }}
                    >
                        Agendar
                    </Button>

                </Flex>
            </Sidebar>
        </>
    );
} 
