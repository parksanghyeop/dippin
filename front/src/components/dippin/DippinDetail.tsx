import { Box, Button, Drawer, DrawerBody, DrawerContent, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DippinDetailItem } from './DippinDetailItem';
import { ModalNavBar } from '../floatingbar/ModalNavBar';
import { FeedPost, HomeFeedData, Music } from '../../types/HomeFeedData';
import { DippinPost } from './DippinPost';
import { useDispatch, useSelector } from 'react-redux';
import { setDefault } from '../../reducers/iframeReducer';
import { DippinPostSmall } from './DippinPostSmall';
import { popCustomList, setCustomList } from '../../reducers/dippinReducer';
import { authAxios } from '../../api/common';

export const DippinDetail = ({
  isOpenDetail,
  onCloseDetail,
  dippinid,
  setDippinId,
}: {
  isOpenDetail: boolean;
  onCloseDetail: () => void;
  dippinid: number;
  setDippinId: any;
}) => {
  const dispatch = useDispatch();

  // 화면에 표시할 게시물
  const [dippin, setDippin] = useState<FeedPost>();
  const [dippinlist, setDippinList] = useState<Array<FeedPost>>([]);
  const postfeeds = HomeFeedData; // 더미 데이터

  // 구성한 플레이리스트
  const customlist = useSelector((state: any) => state.dippinReducer.customlist);

  // 플레이리스트에서 제거
  const removeFromList = (id: string) => {
    dispatch(popCustomList(id));
  };

  // 닫힐 때 실행되는 것들
  const onCloseDrawer = () => {
    // 음악 정지
    console.log('clear musicplay');
    dispatch(setDefault());
    (window as any).player.stopVideo();
    // 초기화
    setDippinId(0);
    dispatch(setCustomList([]));
  };

  // 첫 렌더링 시 서버에 요청
  useEffect(() => {
    if (dippinid === 0) return;
    console.log('DippinDetail: load id ' + dippinid);
    getDippinDetail(dippinid);
  }, [dippinid]);

  // 백엔드에 요청
  const getDippinDetail = async (id: number) => {
    const res: any = await authAxios.get('/dipping', {
      params: {
        dippingId: id,
      },
    });

    const data = res.data.data;
    const main: FeedPost = {
      id: data.Main.item.dippingId,
      title: data.Main.item.dippingTitle,
      likes: data.Main.item.likeCount,
      article: data.Main.item.dippingContent,
      last_modified: data.Main.item.updatedAt,
      user: {
        name: data.Main.item.nickname,
        profile_image: data.Main.item.userId,
      },
      playlist: data.Main.music.map((el: any) => {
        return {
          title: el.songTitle,
          artist: el.songSinger,
          albumart: el.songImgUrl,
          id: el.songUrl,
        };
      }),
      tags: '',
      comments: [],
    };

    const comment: FeedPost[] = data.comment?.map((e: any) => {
      return {
        id: e.item.dippingId,
        title: e.item.dippingTitle,
        likes: e.item.likeCount,
        article: e.item.dippingContent,
        last_modified: e.item.updatedAt,
        user: {
          name: e.item.nickname,
          profile_image: e.item.userId,
        },
        playlist: e.music.map((el: any) => {
          return {
            title: el.songTitle,
            artist: el.songSinger,
            albumart: el.songImgUrl,
            id: el.songUrl,
          };
        }),
        commentCount: e.item.childCount,
      };
    });
    console.log(main);
    setDippin(main);
    setDippinList(comment);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Drawer isOpen={isOpenDetail} onClose={onCloseDetail} size="md" onCloseComplete={onCloseDrawer}>
      <DrawerContent>
        <ModalNavBar
          title="디핑"
          leftElement={
            <Box
              className="fa-light fa-angle-left"
              fontSize="28px"
              lineHeight="36px"
              bg=""
              onClick={onCloseDetail}
            />
          }
          rightElement={
            <Box
              className="fa-light fa-list-music"
              fontSize="20px"
              lineHeight="36px"
              bg=""
              onClick={onOpen}
            />
          }
        />
        <DrawerBody padding="0">
          <Box h="48px" w="full" />
          {dippin && <DippinPost dippin={dippin} id={0} />}
          {dippinlist &&
            dippinlist.map((item, index) => (
              <div key={index}>
                <DippinPostSmall dippin={item} id={index + 1} />
                <hr />
              </div>
            ))}
        </DrawerBody>
        <Drawer isOpen={isOpen} onClose={onClose} size="md">
          <DrawerContent>
            <ModalNavBar
              title="플레이리스트 구성"
              leftElement={
                <Box
                  className="fa-light fa-angle-left"
                  fontSize="28px"
                  lineHeight="36px"
                  bg=""
                  onClick={onClose}
                />
              }
            />
            <DrawerBody paddingX="24px">
              <Box h="48px" w="full" />
              {customlist.map((item: any, index: number) => (
                <div key={index}>
                  <DippinDetailItem {...item} />
                </div>
              ))}
              <hr />
              <Button
                marginY="16px"
                borderRadius="30px"
                w="100%"
                bg="cyan.400"
                // size="lg"
                color="white"
                _hover={{
                  bg: 'cyan.500',
                }}
                _active={{
                  bg: 'cyan.500',
                }}
                onClick={() => {}}
              >
                포스트 작성
              </Button>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </DrawerContent>
    </Drawer>
  );
};
