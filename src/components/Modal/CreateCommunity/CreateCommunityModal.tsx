import { auth, firestore } from '@/firebase/clientApp';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Text, Input, Stack, Checkbox, Flex, Icon } from '@chakra-ui/react';
import { Transaction } from '@google-cloud/firestore';
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import { availableParallelism } from 'os';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';


type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};



const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {

    const [communityName, setCommunityName] = useState('');
    const [chars, setChars] = useState(21);
    const [checked, setChecked] = useState('public');
    const [error , setError] = useState('');
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 21) return;

        setCommunityName(event.target.value);
        setChars(21 - event.target.value.length);

    }

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setChecked(event.target.name)
    }

    const handleCreateCommunity = async() => {
        if(error) setError('');
        const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if(format.test(communityName) || communityName.length<3){
            setError('community must be between 3-21 characters, and can only contain letters, numbers and underscores');
            return;
        }
        
        setLoading(true);

        try {
            const communityDocRef = doc(firestore, 'communities', communityName);
            
            await runTransaction(firestore, async(transaction) =>{

                const communityDoc= await transaction.get(communityDocRef);
                if (communityDoc.exists()){
                    throw new Error(`Sorry, r/${communityName} is already Taken, Try another`);
                    
                }
        
                transaction.set(communityDocRef ,{
                    creatorId: user?.uid,
                    createdAt: serverTimestamp(),
                    numberOfMembers:1,
                    privacyType: checked,
        
                })

                transaction.set( 
                    doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),{
                        communityId: communityName,
                        isModerator: true,
                    }
                )


            } )
            
        } catch (error: any) {
            console.log('handleCreateCommunity Error', error);
            setError(error.message)

            
        }


        setLoading(false);
    }
    return (
        <>
            <Modal isOpen={open} onClose={handleClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={'flex'} flexDirection={'column'} fontSize={15} padding={3} >Create a Community</ModalHeader>
                    <Box pl={3} pr={3}>
                        <ModalCloseButton />
                        <ModalBody display={'flex'} flexDirection={'column'} padding={'10px 0px'}>
                            <Text fontWeight={600} fontSize={15}>Name</Text>
                            <Text fontSize={11} color='gray.500'>Community names including capitalization can not be changed</Text>
                            <Text position='relative' top={'28px'} left={'10px'} width={'20px'} color='gray.500'>r/</Text>
                            <Input position='relative' value={communityName} size='sm' pl='22px' onChange={handleChange} />
                            <Text color={chars === 0 ? 'red' : 'gray.500'}>{chars} Characters Remaining</Text>
                            <Text color={'red'} fontSize='9pt' pt={1}>{error}</Text>
                            <Box mt={4} mb={4}>
                                <Text fontWeight={600} fontSize={15} >Community Type</Text>
                                <Stack>
                                    <Checkbox
                                        name='public'
                                        isChecked={checked==='public'} 
                                        onChange={handleCheck}>
                                            <Flex>
                                            <Icon mr={2} color='gray.500' as={BsFillPersonFill}/>
                                            <Text fontSize={'10pt'} mr={1}>Public</Text>
                                            <Text fontSize={'8pt'}  mt={1} color='gray.500'>Anyone can view, post and comment to this community</Text>
                                            </Flex>
                                    </Checkbox>
                                    <Checkbox 
                                        name='restricted' 
                                        isChecked={checked==='restricted'} 
                                        onChange={handleCheck}>
                                            <Flex>
                                            <Icon mr={2} color='gray.500' as={BsFillEyeFill}/>   
                                            <Text fontSize={'10pt'} mr={1}>Restricted</Text>
                                            <Text fontSize={'8pt'} mt={1}  color='gray.500'>Anyone can view this community but only approved users can post</Text>
                                            </Flex>
                                    </Checkbox>
                                    <Checkbox 
                                        name='private' 
                                        isChecked={checked==='private'}
                                        onChange={handleCheck}>
                                            <Flex>
                                            <Icon mr={2} color='gray.500' as={BsFillEyeFill}/>    
                                            <Text fontSize={'10pt'} mr={1}>Private</Text>
                                            <Text fontSize={'8pt'} mt={1}  color='gray.500'>Only approved users can view and post in this community</Text>
                                            </Flex>
                                    </Checkbox>
                                 </Stack>

                            </Box>

                </ModalBody>
            </Box>

            <ModalFooter bg={'gray.100'} borderRadius='0px 0px 10px 10px'>
                <Button variant='outline' height={'30px'} mr={3} onClick={handleClose}>
                    Cancel
                </Button>
                <Button height={'30px'} isLoading={loading} onClick={handleCreateCommunity}>Create Community</Button>
            </ModalFooter>
        </ModalContent>
      </Modal >
    </>
)}
export default CreateCommunityModal;

