import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Modal } from 'react-native-paper';
import { Button, RadioButton, Text } from '../../components';
import { colors } from '../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { changeSecurityLevel } from '../../store/common/actions';
import { ConversationInfoType, createConversationContent, getMessages } from '../../store/conversations/actions';
import { createGroupContent, getGroupMessages, updateAuth } from '../../store';
import { callApi, generateKey, saveSecurityLevel } from '../../utils';
import { rest, SL_HIGH, SL_MEDIUM, SL_LOW, SL_NONE, mappingSLTime, slChoices } from '../../config';

const SecurityLevel: React.FC = () => {
  const [modal, setModal] = useState({ visible: false, reset: false, loading: false });
  const [level, setLevel] = useState(SL_MEDIUM);

  const dispatch = useDispatch();
  const username = useSelector((state: any) => state.auth.username);
  const convsInfo = useSelector((state: any) => state.convsInfo);
  const groupsInfo = useSelector((state: any) => state.groupsInfo);
  const convsContent = useSelector((state: any) => state.convsContent);
  const groupsContent = useSelector((state: any) => state.groupsContent);

  useEffect(() => {
    if (!username) return;

    /**
     * Check security level and last time save from local storage
     * If this is the first time login, show choosing security level modal
     * If the public key is expired, show confirm modal
     */
    const getStore = async () => {
      let securityLevel: any = await AsyncStorage.getItem(`${username}-security-level`);
      if (securityLevel) {
        const { level: newLevel, lastTime } = JSON.parse(securityLevel);
        setLevel(newLevel);
        dispatch(changeSecurityLevel(newLevel));
        const time = mappingSLTime[newLevel];
        if (time) {
          const now = new Date().getTime() / 1000;
          if (now - lastTime >= time) setModal({ ...modal, visible: true, reset: true });
        }
      } else setModal({ ...modal, visible: true });
    };

    getStore();
  }, [username]);

  const done = () => {
    setModal({ ...modal, visible: false });
    saveSecurityLevel(username, level);
    dispatch(changeSecurityLevel(level));
  };

  /**
   * Get all messages data from server and save to storage, send new public key to server
   */
  const confirm = () => {
    setModal({ ...modal, loading: true });

    let conversationsContent: any[] = [];
    let conversations: any[] = [];

    const getConversationInfo = async (id: string, isPrivate?: boolean) => {
      const response: any = await callApi({
        api: (isPrivate ? rest.getConversationInfo : rest.getGroupInfo)(id),
        method: 'get',
      });
      const { status, data } = response;
      if (status) {
        (isPrivate ? createConversationContent : createGroupContent)(dispatch, {
          id: data.conversation_id,
          name: data.conversation_name,
          avatar: data.conversation_avatar,
          online: data.online,
          full: false,
          users: Object.keys(data.users),
          messages: [],
        });
      }
    };

    convsInfo.map((item: ConversationInfoType) => {
      const index = convsContent.findIndex((item1: any) => item1.id === item.id);
      if (index === -1) conversationsContent.push(getConversationInfo(item.id, true));
    });
    groupsInfo.map((item: ConversationInfoType) => {
      const index = groupsContent.findIndex((item1: any) => item1.id === item.id);
      if (index === -1) conversationsContent.push(getConversationInfo(item.id, false));
    });

    Promise.all(conversationsContent).then(() => {
      convsInfo.map((item: ConversationInfoType) =>
        conversations.push(getMessages(dispatch, { conversationId: item.id }))
      );
      groupsInfo.map((item: ConversationInfoType) =>
        conversations.push(getGroupMessages(dispatch, { conversationId: item.id }))
      );
      Promise.all(conversations).then((values) => {
        /**
         * Generate key, save key to server and close modal
         */
        const { publicKey, privateKey, testMessage } = generateKey();

        const updatePublicKey = async () => {
          const { status } = await callApi({
            method: 'put',
            api: rest.updateProfile(),
            body: {
              pub_key: publicKey,
              test_message: testMessage,
            },
          });
          setModal({ ...modal, visible: false });
          AsyncStorage.setItem(`${username}-private`, privateKey);
          dispatch(updateAuth({ pub_key: publicKey, test_message: testMessage }));
          saveSecurityLevel(username, level);
        };

        updatePublicKey();
      });
    });
  };

  const close = () => {
    setModal({ ...modal, visible: false });
    saveSecurityLevel(username, level);
  };

  return (
    <Modal
      visible={modal.visible}
      dismissable={false}
      // onDismiss={hideModal}
      contentContainerStyle={{ backgroundColor: colors.white, padding: 20 }}>
      <Text style={styles.textInfo}>
        {modal.reset
          ? modal.loading
            ? 'Vui lòng đợi trong giây lát'
            : 'Đã đến thời hạn thay khóa, bạn có muốn thay khóa ngay để tăng cường bảo mật không? Việc này sẽ mất vài giây.'
          : 'Bạn cần mức độ an toàn cho tài khoản của bạn ở mức nào?'}
      </Text>
      <View>
        {!modal.reset &&
          slChoices.map((item) => (
            <RadioButton
              key={item.value}
              style={styles.radio}
              label={item.label}
              checked={level === item.value}
              onPress={() => setLevel(item.value)}
            />
          ))}
        {modal.reset ? (
          modal.loading ? (
            <ActivityIndicator style={styles.loading} animating={true} size={30} color={colors.lightGray} />
          ) : (
            <>
              <Button style={styles.confirm} onPress={confirm} label="Đồng Ý" />
              <Button style={styles.close} onPress={close} label="Đóng" />
            </>
          )
        ) : (
          <Button style={styles.done} onPress={done} label="Xong" />
        )}
      </View>
    </Modal>
  );
};

export default SecurityLevel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  textInfo: {
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 10,
  },
  radio: {
    marginTop: 8,
  },
  done: {
    marginTop: 24,
    marginBottom: 8,
    height: 44,
  },
  confirm: {
    marginTop: 16,
    marginBottom: 8,
    height: 44,
  },
  close: {
    marginBottom: 8,
    height: 44,
  },
  loading: {
    marginVertical: 10,
  },
});
