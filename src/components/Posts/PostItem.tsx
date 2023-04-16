import { Post } from '@/atoms/postAtom';
import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { IoArrowDownCircleOutline, IoArrowDownCircleSharp, IoArrowUpCircle, IoArrowUpCircleOutline, IoArrowUpCircleSharp } from 'react-icons/io5';

type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?:number;
    onVote: ()=>{};
    onDeletePost: ()=>{};
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
            {post.title}
        </Flex>
    )
}
export default PostItem;