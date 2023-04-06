import { AuthModalState } from '@/atoms/authModalAtom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '../../../firebase/clientApp'
import { FIREBASE_ERRORS } from '@/firebase/errors';

const SignUp:React.FC = () => {
    const [
       createUserWithEmailAndPassword,
       user,
       loading,
       userError,
     ] = useCreateUserWithEmailAndPassword(auth);
    
    const [signUpForm, setSignUpForm] = useState({
        email: '',
        password: '',
        confirmPassword:''
    })
    const [error, setError] = useState('');
    const setAuthModalState = useSetRecoilState(AuthModalState)
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        if(error) setError('');
        if(signUpForm.password !== signUpForm.confirmPassword){
            setError('Passwords donot match')
            return;
        }
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    };
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm((prev: any)=>({
            ...prev,
            [event.target.name]: event.target.value,
        }))
     };



    return (
        <form onSubmit={onSubmit}>
            <Input
                required 
                name='email'
                placeholder='email'
                type='email' 
                mb={2} 
                onChange={onChange} 
                fontSize='10pt'
                _placeholder={{color:'gray.500'}}
                _hover={{
                    bg:'white',
                    border:'1px solid',
                    borderColor:'blue.500'
                }}
                _focus={{
                    outline:'none',
                    bg:'white',
                    border:'1px solid',
                    borderColor:'blue.500'
                }}
                bg='gray.50'
                />
            <Input 
                required
                name='password' 
                placeholder='password' 
                type='password' 
                mb={2} 
                onChange={onChange} 
                fontSize='10pt'
                _placeholder={{color:'gray.500'}}
                _hover={{
                    bg:'white',
                    border:'1px solid',
                    borderColor:'blue.500'
                }}
                _focus={{
                    outline:'none',
                    bg:'white',
                    border:'1px solid',
                    borderColor:'blue.500'
                }}
                bg='gray.50'
                
                />
            <Input 
                required
                name='confirmPassword' 
                placeholder='confirm password' 
                type='password' 
                mb={2} 
                onChange={onChange} 
                fontSize='10pt'
                _placeholder={{color:'gray.500'}}
                _hover={{
                    bg:'white',
                    border:'1px solid',
                    borderColor:'blue.500'
                }}
                _focus={{
                    outline:'none',
                    bg:'white',
                    border:'1px solid',
                    borderColor:'blue.500'
                }}
                bg='gray.50'
                
                />
            {(error || userError) && <Text fontSize='10pt' align='center' color='red.600' fontWeight={700}>{error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}</Text>}
            <Button width='100%' height='36px' type='submit' mt={2} mb={2} isLoading={loading}>Sign Up</Button>
            <Flex fontSize='9pt' justifyContent='center'>
                <Text mr={1}> Already a redditor?</Text>
                <Text color='blue.500' fontWeight='700' cursor='pointer' onClick={()=>{
                    setAuthModalState((prev: any)=>({
                        ...prev,
                        view: 'login'
                    }))
                }}> LOG IN</Text>
                
            </Flex>
        </form>
    )
}
export default SignUp;

