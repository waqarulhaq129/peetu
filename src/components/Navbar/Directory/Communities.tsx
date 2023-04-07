import CreateCommunityModal from '@/components/Modal/CreateCommunity/CreateCommunityModal';
import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';


const Communities:React.FC = () => {
    
    const [open, setOpen] = useState(false);
   
    return (
        <>
        <CreateCommunityModal open={open} handleClose={()=>setOpen(false)}/>
        <MenuItem width={'100%'} fontSize={'10pt'} _hover={{bg:'gray.500'}} onClick={()=>setOpen(true)}>
            <Flex align={'center'}>
                <Icon as={GrAdd} mr={2} fontSize={20}/>
                Create Community
            </Flex>
        </MenuItem>
        </>
    )
}
export default Communities;