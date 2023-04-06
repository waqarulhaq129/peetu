import { AuthModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';

type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
   
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const setAuthModalState = useSetRecoilState(AuthModalState)
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        signInWithEmailAndPassword(loginForm.email, loginForm.password)
    };
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev)=>({
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
            <Text fontSize={'10pt'} align='center' color={'red.400'} fontWeight={700}>{FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</Text>
            <Button width='100%' height='36px' type='submit' mt={2} mb={2} isLoading={loading}>Log In</Button>
            <Flex fontSize='9pt' justifyContent='center' >
                <Text mr={1}> New here?</Text>
                <Text color='blue.500' fontWeight='700' cursor='pointer' onClick={()=>{
                    setAuthModalState(prev=>({
                        ...prev,
                        view: 'signup'
                    }))
                }}> SIGN UP?</Text>
            </Flex>
            <Flex fontSize='9pt' justifyContent='center' >
                <Text mr={1}> Forgot Password?</Text>
                <Text color='blue.500' fontWeight='700' cursor='pointer' onClick={()=>{
                    setAuthModalState(prev=>({
                        ...prev,
                        view: 'resetPassword'
                    }))
                }}> Click here</Text>
            </Flex>
        </form>
    );
}
export default Login;