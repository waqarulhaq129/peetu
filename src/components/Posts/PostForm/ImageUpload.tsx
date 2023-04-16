import { Button, Flex, Image, Stack } from '@chakra-ui/react';
import React, { useRef } from 'react';

type ImageUploadProps = {
    selectedFile?:string
    onSelectImage: (event: React.ChangeEvent<HTMLInputElement>)=>void;
    setSelectedTab: (value:string) => void;
    setSelectedFile: (value:string) =>void;
};

const ImageUpload:React.FC<ImageUploadProps> = ({setSelectedFile, onSelectImage, setSelectedTab, selectedFile}) => {

    const selectedFileRef = useRef<HTMLInputElement>(null);
    
    return(
        <Flex justify={'center'} align={'center'} width={'100%'}>
            {selectedFile? (
                <>
                <Flex direction={'column'}  align={'center'} justify={'center'}>
                <Image src={selectedFile} maxHeight={'400px'} maxWidth={'400px'}/>
                <Stack mt={4} direction={'row'} justify={'center'}>
                    <Button height={'28px'} onClick={
                        () => setSelectedTab('Post')
                    }> Back To Post</Button>
                    <Button 
                    variant={'outline'} 
                    height={'28px'}
                    onClick={
                        ()=> setSelectedFile('')
                    }>Remove</Button>
                    

                </Stack>
                </Flex>
                </>
            ):( <Flex 
            justify={'center'} 
            align={'center'} 
            p={20} 
            border={'1px dashed'}
            borderColor={'gray.200'} 
            width={'100%'}
            borderRadius={4}>
                <Button 
                variant={'outline'} 
                height={'28px'} 
                onClick={()=>{
                    selectedFileRef.current?.click()
                }}>
                    Upload</Button>
                <input ref={selectedFileRef} type='file' hidden onChange={onSelectImage}/>
               
                
            </Flex>)}
        </Flex>
    )
}
export default ImageUpload;