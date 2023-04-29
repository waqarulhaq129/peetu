import { Community } from '@/atoms/communitiesAtom';
import { Post } from '@/atoms/postAtom';
import { auth, firestore } from '@/firebase/clientApp';
import usePosts from '@/hooks/usePosts';
import { User } from 'firebase/auth';
import { collection, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostLoader from './PostForm/PostLoader';
import { Stack } from '@chakra-ui/react';

type PostsProps = {
    communityData : Community
    
};

const Posts:React.FC<PostsProps> = ({communityData}) => {
    const [loading, setLoading] = useState(false);
    const {postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost} = usePosts();
    const [user] = useAuthState(auth);
    const getPosts = async () => {
     try {
        setLoading(true);
        const postQuery = query(
            collection(firestore, 'posts'), 
            where('communityId','==',communityData.id),
            orderBy('createdAt','desc')
        );
        const postDocs =  await getDocs(postQuery)
        const posts = postDocs.docs.map(doc=>({id:doc.id, ...doc.data()}));
        setPostStateValue(prev => ({
            ...prev,
            posts: posts as Post[],
            
            
        }));
        setLoading(false);
        console.log(posts);
     } catch (error: any) {
        console.log('getErrorPosts', error.message)
     }    
    };
    useEffect(()=>{
        getPosts();
    },[])
    return (
        <>
        {loading ? <PostLoader/> : 
        <Stack>
            {postStateValue.posts.map(item=> (
                <PostItem 
                key={item.id}
                post={item}
                userIsCreator={user?.uid===item.creatorId} 
                userVoteValue={undefined}
                onVote={onVote}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}/>

            ))}
        </Stack>
        }
        </>
    )
}
export default Posts;