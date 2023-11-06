import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Flex,
    Modal,
    ModalFooter,
    Button,
} from "@chakra-ui/react";

import {FiUser, FiScissors} from 'react-icons/fi'
import { FaMoneyBillAlt } from "react-icons/fa";
import {ScheduleItem} from '../../pages/dashboard'


interface ModalInfoProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    data: ScheduleItem;
    finishService: () => Promise<void>;
}


export function ModalInfo({isOpen, onOpen, onClose, data, finishService}: ModalInfoProps){
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="barber.400">
                <ModalHeader color="white">Próximo</ModalHeader>
                <ModalCloseButton color={"#FFF"}/>

                <ModalBody>
                    <Flex align={"center"} mb={3}>
                        <FiUser size={28} color="orange"/>
                        <Text color={"white"} ml={3} fontSize={"2xl"} fontWeight={"bold"}>
                            {data?.customer}
                        </Text>
                    </Flex>

                    <Flex align={"center"} mb={3}>                        
                    <FiScissors size={28} color="#FFF"/>
                        <Text color={"white"} ml={3} fontSize={"lg"} fontWeight={"bold"}>
                        {data?.haircut?.name}
                        </Text>
                    </Flex>

                    <Flex align={"center"} mb={3}>    
                        <FaMoneyBillAlt size={28} color="#46ef75"/>
                        <Text color={"white"} ml={3} fontSize={"lg"} fontWeight={"bold"}>
                            R$ {data?.haircut?.price}
                        </Text>
                    </Flex>
                    <ModalFooter>
                        <Button
                            bg={"button.cta"}
                            color={"#FFF"}
                            mr={3}
                            _hover={{bg: "button.ctaHover"}}
                            onClick={ () => finishService()}
                        >
                            Finalizar Serviço
                        </Button>
                    </ModalFooter>

                </ModalBody>
        </ModalContent>
        </Modal> 
    )
}