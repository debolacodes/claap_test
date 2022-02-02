import React from 'react';

import {
  Text,
  List,
  ListItem,
  ListIcon,
  HStack,
  Box
} from '@chakra-ui/react'
import claapColors from '../colors'
import {MdCheckCircle} from 'react-icons/md'


interface User{
  firstName: string
  lastName: string
  email: string
  id: string
  anchor?:string 
}

interface IProps{
  selectedUsers: User[]  
}

export default function InvitedUsers(props: IProps) {
  return (
  <Box
          p='50px' 
          rounded='md' 
          bg={claapColors.blue}
          alignItems="stretch"
          boxShadow='md' 
          maxW="475px"
          color={claapColors.white}
          >
              <Text
              fontSize="12px"
              fontWeight="bold"
              mb="20px"
              >Invitation sent to: </Text>
              <List spacing={3}>
                {props.selectedUsers.map((thisUser, index)=>{
                return(
                <ListItem key={index}>
                  <HStack>
                  <ListIcon as={MdCheckCircle} color='green.500' />
                  <Text
                  fontSize="12px"
                  >{`${thisUser['firstName']} ${thisUser['lastName']} `}</Text>
                  <Text 
                  fontSize="12px"
                  fontWeight="bold"
                  >
                  {`${'<'} ${thisUser['email']} ${'>'}`}
                  </Text>
                  </HStack>
                </ListItem>
                )})}
              </List>
            </Box>
  )
}
