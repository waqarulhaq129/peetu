import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Text, Input } from '@chakra-ui/react';
import { availableParallelism } from 'os';
import React, { useState } from 'react';

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: ()=>void;
};



const CreateCommunityModal:React.FC<CreateCommunityModalProps> = ({open, handleClose}) => {
    
    const [communityName, setCommunityName] = useState('');
    

    return( 
    <>
    <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} flexDirection={'column'} fontSize={15} padding={3} >Create a Community</ModalHeader>
          <Box pl={3} pr={3}>
          <ModalCloseButton  />
          <ModalBody display={'flex'} flexDirection={'column'} padding={'10px 0px'}>
            <Text fontWeight={600} fontSize={15}>Name</Text>
            <Text fontSize={11} color='gray.500'>Community names including capitalization can not be changed</Text>
            <Text position='relative' top={'28px'} left={'10px'} width={'20px'} color='gray.500'>r/</Text>
            <Input position= 'relative' value={communityName} size='sm' pl='22px' onChange={()=>{}}/>
          </ModalBody>

          </Box>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button variant='ghost'>Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
)}
export default CreateCommunityModal;

