import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import React from 'react';


const Directory:React.FC= () => {
    
    return (
        <Menu>
            <MenuButton
                cursor={'pointer'}
                padding={'0px 6px'}
                borderRadius={4}
                _hover={{ outline: '1px solid', outlineColor: 'gray.200' }} >
                    <Flex align={'center'}>
                        <Flex align={'center'}></Flex>
                        <ChevronDownIcon/>  
                    </Flex>
            </MenuButton>
            <MenuList>
                
            </MenuList>
        </Menu>
)}
export default Directory;