import { useState, useContext } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import logoImg from '../../../public/images/logo.svg' 
import { Flex, Text, Center, Input, Button } from '@chakra-ui/react'

import Link from 'next/link'

import { AuthContext } from '@/src/context/AuthContext'

import { canSSRGuest } from '@/src/utils/canSSRGuest'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login(){
    const { signIn } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


 async function handleLogin(){
    if(email === '' && password === ''){
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

      await signIn({ email, password })
      toast.success("Carregando login do usuário...");
}



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
            size={'lg'}
            variant={'outline'}
            borderWidth="0.2px" // Define a espessura da borda
            placeholder='Digite seu e-mail'
            type='email'
            mb={3}
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
            />

            <Input
            background={'barber.400'}
            color={'text.default'}
            variant={'outline'}
            borderWidth="0.2px" // Define a espessura da borda
            size={'lg'}
            placeholder='********'
            type='password'
            mb={6}
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
            />

            <Button 
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: '#ffb13e' }}
            onClick={handleLogin}
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
      <ToastContainer />
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
      props: {

      }
  }
})