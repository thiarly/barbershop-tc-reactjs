import Head from 'next/head'
import { Flex, Text, Box, VStack, Heading, Button, Link, Image, useColorModeValue } from '@chakra-ui/react'

export default function Home() {
  const bgBox = useColorModeValue("gray.100", "whiteAlpha.500");

  return (
    <>
      <Head>
        <title>Barber TC - Experiência Inovadora em Barbearias</title>
      </Head>
      <Flex background="barber.900" minHeight="100vh" direction="column" alignItems="center" justifyContent="center" padding="4">
        
        <VStack spacing={10} alignItems="center" width="full">
          <Image src="/images/logo.svg" alt="Logo Barber TC" />
          
          <Box backgroundColor={bgBox} padding="6" borderRadius="md" width="full">
            <VStack spacing="4">
              <Heading color={'gray.900'} size="lg">Inovação e Estilo em Cada Corte</Heading>
              <Text color={'gray.900'}>No Barber TC, revolucionamos a forma como você gerencia sua barbearia. Com ferramentas intuitivas e design elegante, nosso sistema torna a programação de cortes de cabelo algo prazeroso e eficiente.</Text>
              
              <Box as="figure">
                <Image src="/images/bard.jpg" alt="Ferramentas de Barbearia" borderRadius="md" />
                <Text color={'gray.900'} as="figcaption" fontSize="sm" textAlign="center">Inovação e qualidade a serviço da beleza</Text>
              </Box>

              <Text color={'gray.900'} textAlign={'center'}>Desde agendamentos simplificados até o gerenciamento de diferentes estilos e serviços, Barber TC é a escolha certa para barbeiros que buscam excelência e clientes satisfeitos. Venha descobrir um mundo onde estilo e tecnologia se encontram.</Text>

              <Link href="/login" _hover={{ textDecoration: 'none' }}>
                <Button colorScheme="orange" size="lg">Registre-se Agora</Button>
              </Link>
            </VStack>
          </Box>
        </VStack>
      </Flex>
    </>
  )
}
