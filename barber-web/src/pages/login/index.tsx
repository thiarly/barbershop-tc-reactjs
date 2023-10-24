import Head from 'next/head'
import Image from 'next/image'
import logoImg from '../../../public/images/logo.svg' 
import { Flex, Text, Center, Input, Button } from '@chakra-ui/react'

import Link from 'next/link'

export default function Login(){
  return(
    <>
      <Head>
        <title>Barber TC - Página Login</title>
      </Head>
      <Flex background="barber.900" height="100vh" alignItems="center" justifyContent="center">
       
       <Flex width={640} direction="column" p={14} rounded={8}>
            <Center p={4}>
                <Image 
                src={logoImg} 
                width={240}
                quality={100} 
                objectFit='fill' 
                alt="Logo Barber TC" />
            </Center>

            <Input
            background={'barber.400'}
            color={'text.default'}
            variant={'filled'}
            size={'lg'}
            placeholder='Digite seu e-mail'
            type='email'
            mb={3}
            />

            <Input
            background={'barber.400'}
            color={'text.default'}
            variant={'filled'}
            size={'lg'}
            placeholder='********'
            type='password'
            mb={6}
            />

            <Button 
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: '#ffb13e' }}
            >
                Acessar
            </Button>

            <Center mt={2}>
                <Link href="/register">
                    <Text color="text.default" cursor="pointer" >Ainda não tem uma conta? <strong>Cadastre-se</strong></Text>
                </Link>
            </Center>
            
       </Flex>

      </Flex>
    </>
  )
}