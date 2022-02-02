import { useState } from 'react'
import InviteTeammates from './components/InviteTeammates'
import InvitedUsers from './components/InvitedUsers'
import {
  VStack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react'
import claapColors from './colors'


interface User{
  
    firstName: string
    lastName: string
    email: string
    id: string
    anchor?:string
  
}
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedUsers, setSelectedUsers] =  useState<User[]>([])
  const [invited, setInvited] = useState<Boolean>(false)

  return (
    <VStack
    d="flex"
    flexDirection="column"
    pt="200"
    >
        {/* Button on index page */}
        <Button
        colorScheme="purple"
        m="5"
        bg={claapColors.blue2}
        _hover={{
            background: claapColors.bluehover
         }}
        _active={{
          background: claapColors.bluehover
        }}
        onClick={onOpen}
        borderRadius="10px"
        >Invite Teammates</Button>

        
         {/* List of users invited */}
          {invited &&
            <InvitedUsers
              selectedUsers = {selectedUsers}
            />
          }
     

    
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
          <ModalContent p="0">
            <InviteTeammates 
            onClose={onClose}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            setInvited={setInvited}
            ></InviteTeammates>
          </ModalContent>
      </Modal>
    </VStack>
  );
}

export default App;
