import { Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { FaPoll } from 'react-icons/fa';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import TabItem from './TabItem';


type NewPostFormProps = {};

const formTabs: TabItems[] = [
    {
        title:'Post',
        icon: IoDocumentText,
    },
    {
        title:'Images',
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



const NewPostForm:React.FC<NewPostFormProps> = () => {
   
    
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title)
    return (
        <Flex direction={'column'} bg={'white'} border={4} mt={2}>
            <Flex width={'100%'} >{formTabs.map(item=>(
                <TabItem item={item} selected={item.title === selectedTab} setSelectedTab={setSelectedTab}/>
            ))}</Flex>
            
        </Flex>
    )
}
export default NewPostForm;