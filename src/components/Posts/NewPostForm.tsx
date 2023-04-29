import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { FaPoll } from 'react-icons/fa';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import TabItem from './TabItem';
import TextInputs from './PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';
import { User } from 'firebase/auth';
import { Post } from '@/atoms/postAtom';
import { useRouter } from 'next/router';
import { addDoc, collection, serverTimestamp , Timestamp, updateDoc} from 'firebase/firestore';
import { firestore, storage } from '@/firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import useSelectFile from '@/hooks/useSelectFile';



type NewPostFormProps = {
    user: User
};

const formTabs: TabItems[] = [
    {
        title:'Post',
        icon: IoDocumentText,
    },
    {
        title:'Images & Video',
        icon: IoImageOutline,
    },
    {
        title:'Link',
        icon: BsLink45Deg,
    },
    {
        title:'Poll',
        icon: FaPoll,
    },
    {
        title:'Talk',
        icon: BsMic,
    },
];
export type TabItems = {
    title: string;
    icon: typeof Icon.arguments
}



const NewPostForm:React.FC<NewPostFormProps> = ({user}) => {
    const router = useRouter();
     const [loading, setLoading]= useState(false)
     const [selectedTab, setSelectedTab] = useState(formTabs[0].title)
     const [error, setError] = useState(false); 
     const [textInputs, setTextInputs] = useState({
    title: '',
    body: '',
     });

    
     const {selectedFile, setSelectedFile, onSelectFile} = useSelectFile();
     const handleCreatePost = async () => {
        const {communityId} = router.query;
        const newPost:Post ={
            communityId: communityId as string,
            creatorId: user?.uid,
            creatorDisplayName: user.email!.split('@')[0],
            title: textInputs.title,
            body: textInputs.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp,
            
        };
        setLoading(true)
        try {
            const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);

            if(selectedFile){
                const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
                await uploadString(imageRef,selectedFile, 'data_url')
                const downloadURL= await getDownloadURL(imageRef)
                await updateDoc(postDocRef,{
                    ImageURL: downloadURL,
                });

            } 
            router.back();
            
        } catch (error: any) {
            console.log('handleCreatePost Error' , error.message)
            setError(true);
        }
        setLoading(false);
    };


        
        const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const {target:{name, value}} = event;

        setTextInputs(prev => ({

            ...prev,
            [name]:value,

        }));
     };

     return (
        <Flex direction={'column'} bg={'white'} border={4} mt={2}>
            <Flex width={'100%'} >{formTabs.map(item=>(
                <TabItem key={item.title} item={item} selected={item.title === selectedTab} setSelectedTab={setSelectedTab}/>
            ))}</Flex>
            <Flex p={4}>
                {selectedTab==='Post' && 
                <TextInputs textInputs={textInputs} 
                handleCreatePost={handleCreatePost}
                onChange={onTextChange}
                loading={loading}/>            
                }
                {selectedTab==='Images & Video' &&
                <ImageUpload selectedFile={selectedFile}
                 setSelectedFile={setSelectedFile}
                 setSelectedTab={setSelectedTab} 
                 onSelectImage={onSelectFile} />}
            
            </Flex>
            {error && (
                <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Error Creating Post!</AlertTitle>
              </Alert>
            )}
        </Flex>
    )
}
export default NewPostForm;