import {
  Box,
  useColorModeValue,
  Image,
  Avatar,
  Center,
  Flex,
  Spacer,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerBody,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAxios } from '../../api/common';
import { parseJwt } from '../../api/login/local';
import { DippinForm } from '../DippinForm';
import { ModalNavBar } from '../floatingbar/ModalNavBar';
import { PlayerSmall } from './PlayerSmall';

export const DippinPost = (props: any) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { dippin, id } = props;
  const [mylike, setMyLike] = useState(dippin.myLike);
  const [likecount, setLikeCount] = useState(dippin.likes);

  const toggleLike = async () => {
    setLikeCount((likes: number) => (mylike ? likes - 1 : likes + 1));
    setMyLike((mylike: boolean) => !mylike);

    authAxios
      .post('/dipping/like', {
        dippingLike: {
          dippingId: dippin.id,
        },
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <Box position="relative" w="full" paddingX="24px" borderBottom="1px" borderColor={borderColor}>
      {/* top bar */}
      <Flex position="relative" h="40px" w="auto" marginTop="16px">
        <Center
          h="40px"
          w="full"
          lineHeight="20px"
          fontSize="18px"
          fontWeight="600"
          overflow="hidden"
        >
          <Box w="full">{dippin.title}</Box>
        </Center>
        <Box
          marginX="6px"
          h="40px"
          w="auto"
          lineHeight="40px"
          fontSize="14px"
          fontWeight="300"
          whiteSpace="nowrap"
        >
          {dippin.user.name}
        </Box>
        <Link to={'/profile/?nickname=' + dippin.user.name}>
          <Avatar boxSize="40px" name={dippin.user.name} src={dippin.user.profile_image} />
        </Link>
      </Flex>

      {/* article set */}
      <Box position="relative" marginY="8px" fontWeight="400" fontSize="14px">
        {dippin.article}
      </Box>

      {/* icon set */}
      <Flex position="relative" h="24px" w="full" bg="" marginY="8px" fontSize="24px">
        {mylike ? (
          <Box
            className="fa-solid fa-heart"
            fontSize="24px"
            color="cyan.400"
            onClick={toggleLike}
          />
        ) : (
          <Box className="fa-regular fa-heart" fontSize="24px" onClick={toggleLike} />
        )}
        <Box lineHeight="24px" marginLeft="8px">
          {likecount}
        </Box>
        <Spacer />
        {dippin.user.name === parseJwt(localStorage.getItem('accessToken')).nickname && (
          <Box
            className="fa-light fa-eraser"
            marginLeft="8px"
            onClick={() => {
              if (window.confirm('정말 삭제하시겠습니까?')) {
                console.log('삭제');
                authAxios.delete('/dipping?dippingId=' + dippin.id);
                window.location.href = '/dippin';
              }
            }}
          />
        )}

        <Box className="fa-light fa-comment-plus" marginLeft="8px" onClick={onOpen} />
        <Box className="fa-light fa-share-nodes" marginLeft="8px" />
      </Flex>

      {/* music player */}
      {dippin.playlist.length > 0 && <PlayerSmall playlist={dippin.playlist} id={id} />}

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <ModalNavBar
            title="디핑"
            leftElement={
              <Box
                className="fa-light fa-angle-left"
                fontSize="28px"
                lineHeight="36px"
                bg=""
                onClick={onClose}
              />
            }
            // rightElement={'완료'}
          />
          <DrawerBody>
            <Box h="48px" w="full" />
            <DippinForm parent={dippin.id} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box h="16px" />
    </Box>
  );
};
