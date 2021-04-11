import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text, HeaderBar, PaddingView, TouchableOpacity, TextInput } from '../../components';
import { colors } from '../../constants';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { callApi } from '../../utils';
import { UserType, rest } from '../../config';
import { loadingRequest, loadingSuccess } from '../../store/common/actions';
import { createConversation } from '../../store';

interface Props {
  navigation: { push: any; navigate: any; goBack: any };
}

const SearchContact: React.FC<Props> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    if (!search) return;

    const delayDebounceFn = setTimeout(async () => {
      const response = await callApi({ method: 'get', api: rest.searchFriends(search) });
      const { status, data } = response;
      if (status) {
        if (Array.isArray(data)) setUsers(data);
        else setUsers([data]);
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSelect = async (userId: string) => {
    dispatch(loadingRequest());
    await createConversation(dispatch, { userId });
    dispatch(loadingSuccess());
    // navigation.navigate('MessengerTab', { screen: 'Conversation', params: { conversationId: userId } });
    navigation.navigate('Conversation', { conversationId: userId });
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderBar parent="Directory" title="Tìm kiếm" isBack />
      <PaddingView>
        <View style={styles.inputWrapper}>
          <FontAwesome5 name="search" size={14} color={colors.secondary} />
          <TextInput value={search} onChangeText={(value) => setSearch(value)} style={styles.input} />
          {search !== '' && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <FontAwesome name="times-circle" size={20} color={colors.secondary} />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ marginTop: 10 }}>
          {users.map((item: UserType) => (
            <TouchableOpacity key={item.id} style={styles.userWrapper} onPress={() => handleSelect(item.id)}>
              <Image source={{ uri: item.avatar_path }} style={styles.avatar} />
              <Text style={{ marginLeft: 10 }}>{item.display_name || item.username}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </PaddingView>
    </ScrollView>
  );
};

export default SearchContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  inputWrapper: {
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ebeced",
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
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
});
