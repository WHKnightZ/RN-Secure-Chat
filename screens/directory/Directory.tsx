import React from 'react';
import { FlatList, StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { PaddingView, HeaderBar, Text } from '../../components';
import AddContact from './AddContact';
import SearchContact from './SearchContact';
import { useSelector } from 'react-redux';
import { DEFAULT_AVATAR } from '../../config';
import { colors } from '../../constants';

const Stack = createStackNavigator();

interface Props {
  navigation: { push: any; navigate: any; goBack: any };
}

const Directory: React.FC<Props> = (props) => {
  const { navigation } = props;
  const friends = useSelector((state: any) => state.friends);

  const renderItem = ({ item }: any) => {
    const { avatar_path, username, display_name } = item;
    return (
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri: avatar_path || DEFAULT_AVATAR }} />
        <Text style={styles.displayName}>{display_name || username}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBar navigation={navigation} title="Danh bạ" items={['scanqr', 'search']} />
      <PaddingView>
        <FlatList style={styles.container} data={friends} renderItem={renderItem} />
        <Text style={styles.note}>
          Tại đây, bạn sẽ thấy toàn bộ những người mà bạn đã tương tác cùng, hãy thêm bạn bè để nói chuyện nhé.
        </Text>
        <Button onPress={() => navigation.push('AddContact')}>Thêm liên lạc mới</Button>
      </PaddingView>
    </View>
  );
};

const DirectoryStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Directory" component={Directory} />
      <Stack.Screen name="AddContact" component={AddContact} />
      <Stack.Screen name="SearchContact" component={SearchContact} />
    </Stack.Navigator>
  );
};

export default DirectoryStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    marginTop: 20,
    paddingHorizontal: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
  },
  displayName: {
    fontSize: 16,
    marginLeft: 18,
  },
  note: {
    marginVertical: 10,
    color: colors.gray,
  },
});
