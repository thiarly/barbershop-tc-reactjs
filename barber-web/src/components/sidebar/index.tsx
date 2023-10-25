import { Children, ReactNode } from 'react';
import { 
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    Drawer,
    DrawerContent,
    Text,
    useColorModeValue,
    useDisclosure,
    BoxProps,
    FlexProps,
    Center,
} from '@chakra-ui/react';

import {
    FiScissors,
    FiClipboard,
    FiSettings,
    FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons';

import Link from 'next/link'

interface LinkItemProps {
    name: string;
    icon: IconType;
    route: string;
}

const LinkItems: Array<LinkItemProps>  = [
    { name: 'Agenda', icon: FiScissors, route: '/dashboard' },
    { name: 'Cortes', icon: FiClipboard, route: '/haircuts' },
    { name: 'Minha Conta', icon: FiSettings, route: '/profile' },
]

export function Sidebar( { children }: { children: ReactNode }){

    const { isOpen, onOpen, onClose } = useDisclosure();

    return(
        <Box minH="100vh" bg="barber.900">
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Box>
                {children}
            </Box>

        </Box>
    )
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return(
        <Box
        bg="barber.400"
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos='fixed'
        h="full"
        {...rest}
        >
            
        <Flex h="20" alignItems="Center" mx="8" justifyContent="space-between"/>
            <Link href="/dashboard">
                <Flex cursor="pointer" userSelect="none" flexDirection="row">
                    <Text fontSize="30" fontFamily="monospace" marginLeft={6} marginBottom={8} fontWeight="bold" color="white">Barber</Text>
                    <Text fontSize="30" fontFamily="monospace"  fontWeight="bold" marginBottom={8} color="button.cta" >TC</Text>
                </Flex>
            </Link>
            <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />

            {LinkItems.map((link => (
                <NavItem icon={link.icon} route={link.route} name={link.name} key={link.name}>
                    {link.name}
                </NavItem>
            )))}    

        </Box>
    )
}

interface NavItemProps {
    name: string;
    icon: IconType;
    route: string;
    children?: ReactNode;  // Note que eu adicionei children aqui, pois você usa isso na função NavItem.
}



const NavItem = ({ icon, children, route, ...rest }: NavItemProps) => {
    return(
        <Link href={route} style={{ textDecoration: "none" }} >
        <Flex
            align={'Center'}
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            color="text.default"
            cursor={'pointer'}
            _hover={{ bg: 'barber.900', color: 'barber.100' }} {...rest}
        >
            {icon && (
                <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{ color: 'barber.100' }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    </Link>
    )
}
