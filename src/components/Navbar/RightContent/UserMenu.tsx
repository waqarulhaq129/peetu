import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Button, MenuList, MenuItem, Icon, Flex, Text } from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React from 'react';
import { FaRedditSquare } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineLogin } from 'react-icons/md'
import { VscAccount} from 'react-icons/vsc'
import { auth } from '@/firebase/clientApp';
import { IoSparkles } from 'react-icons/io5';
type UserMenuProps = {
    user?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {

    return (
        <Menu>
            <MenuButton
                cursor={'pointer'}
                padding={'0px 6px'}
                borderRadius={4}
                _hover={{ outline: '1px solid', outlineColor: 'gray.200' }} >
                    <Flex align={'center'}>
                        <Flex align={'center'}>
                {user ?
                            <>
                                <Icon fontSize={24} color="gray.300" as={FaRedditSquare} />
                                <Flex direction={'column'} display={{base:'none', lg:'flex'}} fontSize='8pt' mr={8}>
                                    <Text>{user?.displayName|| user.email?.split(('@')[0])}</Text>
                                    <Flex>
                                        <Icon as={IoSparkles} color='brand.100' mr={1}></Icon>
                                        <Text color='gray.400'>1 Karma</Text>
                                    </Flex>
                                </Flex>
                            </>

                    : <Icon fontSize={24} color='gray.400' as={VscAccount} />}
                    <ChevronDownIcon />
                </Flex>
            </Flex>
            </MenuButton>
            <MenuList>
                <MenuItem
                    fontSize={'10pt'}
                    fontWeight={700}
                    _hover={{ bg: 'blue.500', color: 'white' }} >
                    <Flex
                        align={'center'} >
                        <Icon fontSize={20} mr={2} as={CgProfile} />
                        Profile

                    </Flex>
                </MenuItem>
                <MenuItem
                    fontSize={'10pt'}
                    fontWeight={700}
                    _hover={{ bg: 'blue.500', color: 'white' }} 
                    onClick={()=>signOut(auth)}>
                    <Flex
                        align={'center'} >
                        <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                        Log Out

                    </Flex>

                </MenuItem>
            </MenuList>
        </Menu>
    )
}
export default UserMenu;