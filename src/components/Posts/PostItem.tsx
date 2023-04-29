import { Post } from '@/atoms/postAtom';
import { DeleteIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, AlertTitle, Flex, Icon, Image, Skeleton, Spinner, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import { BsChat } from 'react-icons/bs';
import {AiOutlineDelete} from 'react-icons/ai'
import { IoArrowDownCircleOutline, IoArrowDownCircleSharp, IoArrowRedoOutline, IoArrowUpCircle, IoArrowUpCircleOutline, IoArrowUpCircleSharp, IoBookmarkOutline } from 'react-icons/io5';
import { error } from 'console';
import { TIMEOUT } from 'dns';

type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?:number;
    onVote: ()=>{};
    onDeletePost: (post: Post)=> Promise<boolean>;
    onSelectPost: ()=> void;

};

const PostItem:React.FC<PostItemProps> = ({
    post,
    userIsCreator,
    userVoteValue,
    onVote,
    onDeletePost,
    onSelectPost,
}) => {
    const [loadingImage, setLoadingImage] = useState(true);
    const [error, setError] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false);
    const handleDelete= async ()=>{
        try {
            setLoadingDelete(true);
            const success = await onDeletePost(post)
            
            if(!success){
                throw new Error('failed to delete post')
            }
            setLoadingDelete(false);
        } catch (error: any) {
            setError(error.message)
        }
    }
    return(
        <Flex 
            border={'1px solid'} 
            bg={'white'} 
            borderColor={'gray.300'} 
            borderRadius={4} 
            _hover={{borderColor: 'gray.500'}}
            cursor={'pointer'}
            onClick={onSelectPost}>
                <Flex 
                direction={'column'} 
                align={'center'} 
                bg={'gray.100'} 
                p={2} 
                width={'40px'}
                borderRadius={4}> 
                    <Icon 
                    as={userVoteValue===1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
                    color={userVoteValue===1? 'brand.100':'gray.400'}
                    fontSize={22}
                    onClick={onVote}
                    cursor={'pointer'}
                    />
                    <Text fontSize={'9pt'}>{post.voteStatus}</Text>
                    <Icon 
                    as={userVoteValue===-1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
                    color={userVoteValue===-1? '#4379ff':'gray.400'}
                    fontSize={22}
                    onClick={onVote}
                    cursor={'pointer'}
                    />
                </Flex>
                <Flex direction={'column'} width={'100%'}>
                    {error && (
                    <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>{error}</AlertTitle>
                    </Alert>
                    )}
                    <Stack spacing={1} p={'10px'}>
                        <Stack direction={'column'} spacing={0.6} align={'center'} fontSize={'9pt'}>
                            {/* Check HOme page display icon */}
                            <Text>
                                Posted by u/{post.creatorDisplayName}
                                {' '}
                                {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
                            
                            </Text>                                                       
                        </Stack>
                        <Text fontSize={'12pt'} fontWeight={600}  >
                            {post.title}
                        </Text>
                        <Text>{post.body}</Text>
                        
                        {post.ImageURL && (
                            
                            <Flex justify={'center'}  align={'center'} p={2}>
                                {loadingImage && <Skeleton height='200px' width={'100%'} borderRadius={4} />}
                                    
                                    <Image 
                                    src={post.ImageURL} 
                                    maxHeight={'468px'} 
                                    alt='Post Image' 
                                    onLoad={()=>setLoadingImage(false)} 
                                    display={loadingImage? 'none':'unset'}
                                    />
                                
                            </Flex>
                            )}
                    </Stack>
                    <Flex ml={1} mb={0.5} color={'gray.500'}>
                         <Flex align={'center'} p={'8px 10px'} borderRadius={4} _hover={{bg:'gray.200'}}>
                            <Icon as={BsChat} mr={2}/>
                            <Text fontSize={'9pt'}>{post.numberOfComments}</Text>
                         </Flex>
                         <Flex align={'center'} p={'8px 10px'} borderRadius={4} _hover={{bg:'gray.200'}}>
                            <Icon as={IoArrowRedoOutline} mr={2}/>
                            <Text fontSize={'9pt'}>Share</Text>
                         </Flex>
                         <Flex align={'center'} p={'8px 10px'} borderRadius={4} _hover={{bg:'gray.200'}}>
                            <Icon as={IoBookmarkOutline} mr={2}/>
                            <Text fontSize={'9pt'}>Save</Text>
                         </Flex>
                         {userIsCreator && (<Flex align={'center'} p={'8px 10px'} borderRadius={4} _hover={{bg:'gray.200'}} onClick={handleDelete}>
                            {loadingDelete ? (
                                <Spinner size={'sm'}/>
                            ):(
                                <>
                                <Icon as={AiOutlineDelete} mr={2} />
                                <Text fontSize={'9pt'}>Delete</Text>
                                </>
                            )

                            }
                         </Flex>)}
                    </Flex>
                    


                </Flex>

        </Flex>
    )
}
export default PostItem;