import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text, HeaderBar, PaddingView, TouchableOpacity, TextInput } from '../../components';
import { colors } from '../../constants';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { callApi, includes } from '../../utils';
import { UserType, rest } from '../../config';
import { useSelector } from 'react-redux';

interface Props {
  navigation: { push: any; navigate: any; goBack: any };
}

const CreateGroup: React.FC<Props> = (props) => {
  const { navigation } = props;

  const auth = useSelector((state: any) => state.auth);

  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<any>([]);
  const [members, setMembers] = useState<{ id: string; avatar: string; name: string }[]>([
    { id: auth.id, avatar: auth.avatar_path, name: auth.display_name || auth.username },
  ]);
  const refInput = useRef<any>(null);

  useEffect(() => {
    if (!search) {
      if (users.length !== 0) setUsers([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      const response = await callApi({ method: 'get', api: rest.searchFriends(search) });
      const { status, data } = response;
      if (status) {
        if (Array.isArray(data)) setUsers(data);
        else setUsers([data]);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(() => {
    if (!refInput.current) return;
    refInput.current.focus();
  }, [refInput.current]);

  const handleSelect = (item: any) => {
    setSearch('');
    setMembers([...members, { id: item.id, avatar: item.avatar_path, name: item.display_name || item.username }]);
  };

  const handleRemove = (id: string) => {
    setMembers(members.filter((item) => item.id !== id));
  };

  const submit = async () => {
    if (members.length < 3 || name === '') {
      Alert.alert('Nhóm chat phải có tên và có ít nhất ba người!');
      return;
    }
    const { status, data }: any = await callApi({
      method: 'post',
      api: rest.createGroup(),
      body: {
        users_id: members.map((item) => item.id),
        name,
      },
    });
    if (status) {
      console.log(data.id);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title="Tạo nhóm mới" isBack submit={{ text: 'Xong', callback: submit }} />
      <PaddingView>
        <View style={styles.container}>
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>Tên nhóm:</Text>
            <TextInput
              innerRef={refInput}
              placeholder="Đặt tên ..."
              value={name}
              onChangeText={(value) => setName(value)}
              style={styles.name}
            />
          </View>
          <View>
            {members.slice(1).map((item) => (
              <View key={item.id} style={styles.memberWrapper}>
                <View style={styles.rowCenter}>
                  <Image
                    source={{ uri: item.avatar }}
                    style={{ width: 30, height: 30, borderRadius: 20, marginRight: 14 }}
                  />
                  <Text>{item.name}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemove(item.id)}>
                  <MaterialCommunityIcons name="close-circle" size={20} color={colors.gray} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.searchWrapper}>
            <FontAwesome5 name="search" size={14} color={colors.secondary} />
            <TextInput
              placeholder="Tìm kiếm ..."
              value={search}
              onChangeText={(value) => setSearch(value)}
              style={styles.search}
            />
            {search !== '' && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <FontAwesome name="times-circle" size={20} color={colors.secondary} />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ marginTop: 10 }}>
            {users
              .filter((item: any) => !includes(members, item))
              .map((item: UserType) => (
                <TouchableOpacity key={item.id} style={styles.userWrapper} onPress={() => handleSelect(item)}>
                  <Image source={{ uri: item.avatar_path }} style={styles.avatar} />
                  <Text style={{ marginLeft: 10 }}>{item.display_name || item.username}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.note}>
            Bạn có thể kết nối với bạn bè tại đây để trải nghiệm cộng nghệ Chat bảo mật hoàn toàn mới.
          </Text>
        </View>
      </PaddingView>
    </View>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memberWrapper: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  name: {
    fontSize: 16,
    marginRight: 10,
  },
  searchWrapper: {
    marginTop: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fafbfc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  search: {
    width: '100%',
    marginHorizontal: 12,
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  note: {
    marginVertical: 10,
    color: colors.gray,
  },
});
