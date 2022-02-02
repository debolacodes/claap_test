import React, {useState, useEffect, ReactElement} from 'react';
import {
  Text,
  VStack,
  Box,
  Input,
  Button,
  Wrap,
  WrapItem,
  Flex,
  useToast
} from '@chakra-ui/react'
import claapColors from '../colors';

import {MdMailOutline, MdOutlineClose } from 'react-icons/md'
interface User{
    firstName: string
    lastName: string
    email: string
    id: string
    anchor?: string 
}
interface IProps{
    onClose: () => void;
    selectedUsers: User[]
    setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>  
    setInvited: React.Dispatch<React.SetStateAction<Boolean>>   
}
export default function InviteTeammates(props: IProps) {

    
    const toast = useToast()
    const [inputValue, setInputValue] = useState<string>("")
    const [isInputValueEmail, setIsInputValueEmail] = useState<boolean>(false)
    const [activeInviteButton, setActiveInviteButton] = useState<boolean>(false) 
    const [found, setFound] = useState<User[]>([])


    useEffect(()=>{
        if(typeof props.selectedUsers !== "undefined"){
            if(props.selectedUsers.length > 0){
                setActiveInviteButton(true)
            }else{
                setActiveInviteButton(false)
            }
        }
    },[props.selectedUsers])

    useEffect(()=>{
        if(validateEmail(inputValue)){
            setIsInputValueEmail(true)
        }else{
            setIsInputValueEmail(false)
        }
    },[inputValue])

    useEffect(()=>{
        if(found.length === 0){
            props.setSelectedUsers([])
            props.setInvited(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const addToSelected = (user:User) => {
        const normalized = normalize(inputValue)  
        var c:User[] = [...props.selectedUsers];
       
        // Checks if user with same email have been selected before
        var checkUser:User[] = c.filter(({ email }) =>{
            if(user.email === email){
                return true
            }else{
                return false
            }
        })

        
        //if not, add user to selected users
        if(checkUser.length === 0){

            //added anchor, stores what user inputed 
            if (validateEmail(normalized)) {
                user.anchor = user.email
            }else if(normalize(user.firstName).startsWith(normalized)){
                user.anchor = user.firstName
            }else{
                user.anchor = user.lastName
            }
            c.push({...user});
            props.setSelectedUsers([...c]);
        }else{
            toast({
                title: 'User already added',
                description: `${user.firstName} ${user.lastName} <${user.email}>  added already`,
                status: 'info',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const normalize = (input:string) => {
        return input.trim().toLowerCase()
    }

    const validateEmail = (email: string) : RegExpMatchArray | null => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const renderNames = (user: User, index: number): ReactElement => {
        //returns Box that displays either name or email, based on user input

        var returnElement : ReactElement
            var isEmail : RegExpMatchArray | null =  validateEmail(user.anchor + "")
            returnElement = 
            <WrapItem
            key={user.id}
            >
                <Box
                rounded="md"
                p="5px 10px"
                d="flex"
                alignItems="center"
                h="26px"
                border='1px' 
                borderColor={claapColors.pink}
                >   

                    {/* Mail icon if user inputs email */}
                    {isEmail &&
                    <MdMailOutline 
                    fontSize="18px"
                    color={claapColors.pink}
                    
                    />
                    }

                    {/* First Character of Name if user inputs email */}
                    {!isEmail &&
                    <Box
                    w="17px"
                    h="17px"
                    borderRadius="12px"
                    bg={claapColors.pink}
                    >
                        <Text
                        color="#ffffff"
                        align="center"
                        fontSize="11px"
                        w="100%"
                        >{user.firstName.charAt(0)}</Text>
                    </Box>
                    }

                    <Text
                    fontSize="11px"
                    p="0 11px"
                    color={claapColors.pink}
                    >{displayUserName(user, user.anchor)}</Text>
                    
                    <MdOutlineClose
                    fontSize="12px"
                    color={claapColors.pink}
                    onClick={()=>{
                        var c = [...props.selectedUsers]
                        c.splice(index, 1)
                        props.setSelectedUsers(c)
                    }}
                    cursor="pointer"
                    />
                </Box>
            </WrapItem>

        return returnElement

    }

    const displayUserName = (user: User, input:string | undefined) =>{
        if(user.email === input){
            return user.email
        }else {
            return user.firstName +' '+user.lastName
        }
    }

    const delay = (ms : number) => new Promise((resolve) => setTimeout(resolve, ms))
    
    const ErrorRegex = '/error/gi'

    const Users = [
        {
            firstName: 'Tara',
            lastName: 'Halvik',
            id: (Math.random() * 1000).toString(),
            email: 'tara@claap.io'
        },
        {
            firstName: 'Tristan',
            lastName: 'Agosta',
            id: (Math.random() * 1000).toString(),
            email: 'tristan@claap.com'
        }
    ]

    const searchUser = async (input: string): Promise<User[]> => {
        const normalized = normalize(input)
      
        await delay(200 + Math.random() * 200)
      
        if (normalized.match(ErrorRegex)) {
          throw new Error('Backend failed for some reasons.')
        }
      
        if (!normalized) {
          return []
        }
      
        return Users.filter(({ firstName, lastName, email }) => {
          if (email === normalized) {
            return true
          }
      
          if (normalize(firstName).startsWith(normalized)) {
            return true
          }
      
          if (normalize(lastName).startsWith(normalized)) {
            return true
          }
      
          return false
        })
      }
  
return (
    <VStack 
    alignItems="stretch"
    p='64px' 
    rounded='md' 
    bg={claapColors.blue}
    boxShadow='md' 
    maxW="528px"
    minH="302px"
    width="100%"

    >
        <Text 
        fontSize="24" 
        fontWeight="normal"
        lineHeight="2"
        color={claapColors.white2}
        width="100%"
        align="center"
        mb="32px"
        >Invite members</Text>

        <Text
        fontSize="15" 
        fontWeight="normal"
        lineHeight="0"
        color={claapColors.white2}
        >Email invite</Text>
           

        <Text
        fontSize="13" 
        fontWeight="thin"
        p="10px 0"
        textColor={claapColors.grey}
        >Send members email invitation to join this workspace</Text>
            

        <Flex>
            <Box flex="1">
                <Box 
                w="100%"
                minH="38px"
                bg={claapColors.bluedark}
                d="flex"
                alignContent="space-around"
                p="4px"
                border='1px' 
                borderColor={claapColors.bluedark2}
                borderRadius="10px"
                >
                    {typeof props.selectedUsers !== "undefined" &&
                    <Wrap spacing='5px' justify='left'>
                    { props.selectedUsers.map((thisUser, index) => renderNames(thisUser, index))}
                    <WrapItem>
                    <Input
                    placeholder='Search names or emails'
                    variant="unstyled"
                    fontSize="13px"
                    color={claapColors.white}
                    value={typeof inputValue !== "undefined" ? inputValue : ""}
                    _placeholder={{ 
                        color: claapColors.white,
                        opacity: "0.3"
                    }}
                
                    onChange={async (e)=>{
                        setInputValue(e.target.value)
                        setFound(await searchUser(e.target.value))
                    }}
                    padding="4px 10px"
                    ></Input>
                    </WrapItem>
                    </Wrap>
                    }
                </Box>

                {found.length > 0 &&
                <Box
                    bgColor={claapColors.bluedark}
                    p="20px"
                    m="1px"
                    borderRadius="10px"
                    border='1px'
                    borderColor={claapColors.bluedark2}
                    >
                    {found.map((thisUser, index)=>{
                    return (
                        <Box 
                            key={index}
                            //  w="168"
                            //  h="29"
                            borderRadius="5px"
                            p="5px"
                            d="flex"
                            alignItems="center"
                            cursor="pointer"
                            onClick={() => addToSelected(thisUser)}
                            >
                            {!isInputValueEmail &&
                            <Box
                            w="17px"
                            h="17px"
                            borderRadius="12px"
                            bg={claapColors.pink}
                            >
                                <Text
                                color="#ffffff"
                                align="center"
                                fontSize="11px"
                                w="100%"
                                
                                >{thisUser.firstName.charAt(0)}</Text>
                            </Box>
                            }
                            {isInputValueEmail &&
                            <MdMailOutline 
                            fontSize="18px"
                            color={claapColors.pink}
                            />
                            }
                            <Text
                            fontSize="11px"
                            p="0 11px"
                            color={claapColors.pink}
                            >{displayUserName(thisUser, inputValue)}</Text>
                            </Box>
                    )
                    })}
                </Box>
                }
            </Box>

            <Button
            w="78px"
            h="36px"
            ml="16px"
            fontSize="13px"
            fontWeight="bold"
            borderRadius="10px"
            bg={`${activeInviteButton ? claapColors.blue2 : claapColors.blue2}`}
            _hover={{
                background: `${activeInviteButton ? claapColors.blue2 : claapColors.blue2}`
            }}
            _active={{
                background: `${activeInviteButton ? claapColors.bluedark2 : claapColors.bluedark2}`
            }}
            color={`${activeInviteButton ? claapColors.white : claapColors.white}`}

            onClick={()=>{
                if(activeInviteButton){
                    props.setInvited(true)
                    props.onClose()
                }else{
                    toast({
                        title: 'No User Selected',
                        description: "Select at least 1 teammate to invite.",
                        status: 'info',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            }}
            >Invite</Button>
        </Flex>
    </VStack>
);
}
