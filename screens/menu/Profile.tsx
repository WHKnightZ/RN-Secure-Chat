import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground, Image, Platform, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import { Text, HeaderBar, PaddingView, TouchableOpacity, TextInput, RadioButton } from '../../components';
import { colors, defaultUuid } from '../../constants';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { updateAuth } from '../../store';
import { BASE_URL, rest } from '../../config';
import { callApi } from '../../utils';

interface Props {
  navigation: { push: any; navigate: any; goBack: any };
}

const Profile: React.FC<Props> = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const cover = auth.cover ? { uri: auth.cover } : require('../default-cover.jpg');
  const avatar = auth.avatar_path ? { uri: auth.avatar_path } : require('../default-avatar.png');

  const [profile, setProfile] = useState({
    isUpdating: false,
    name: auth.display_name || auth.username,
    gender: auth.gender,
    birthday: auth.birthday,
  });

  const RenderItem = ({ icon, title, updating }: any) => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: colors.white,
          alignItems: 'center',
          paddingHorizontal: 18,
          paddingVertical: 14,
          borderTopWidth: 0.8,
          borderStyle: 'solid',
          borderTopColor: '#f3f4f5',
        }}>
        <View style={{ width: 30 }}>
          <FontAwesome5 name={icon} size={18} color={colors.primary} />
        </View>
        {updating || <Text style={{ fontSize: 15 }}>{title}</Text>}
      </View>
    );
  };

  const handleUpdate = async () => {
    if (!profile.isUpdating) {
      setProfile({ ...profile, isUpdating: true });
    } else {
      setProfile({ ...profile, isUpdating: false });
      dispatch(updateAuth({ display_name: profile.name, gender: profile.gender }));
      const response: any = await callApi({
        api: rest.updateProfile(),
        method: 'put',
        body: {
          display_name: profile.name,
          gender: profile.gender ? 1 : 0,
        },
      });
      console.log(response);
    }
  };

  const handlePickImage = async () => {
    if (Platform.OS === 'web') return;
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Bạn cần cấp phép quyền truy cập thư mục!');
      return;
    }
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const { uri } = result;
      const formData = new FormData();
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${auth.access_token}`);
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const blob: any = {
        uri,
        name: `avatar.${fileType}`,
        type: `image/${fileType}`,
      };
      formData.append('image', blob);

      const requestOptions: any = {
        method: 'PUT',
        headers: myHeaders,
        body: formData,
        redirect: 'follow',
      };

      fetch(BASE_URL + rest.changeAvatar(), requestOptions)
        .then((response) => response.text())
        .then((result: any) => {
          if (JSON.parse(result).status) {
            dispatch(updateAuth({ avatar_path: uri }));
          }
        })
        .catch((error) => console.log('error', error));
    }
  };

  return (
    <ScrollView style={{ backgroundColor: colors.white }}>
      <HeaderBar navigation={navigation} title="Trang cá nhân" isBack />
      <View style={{ paddingHorizontal: 24, alignItems: 'center', paddingBottom: 10 }}>
        <View style={{ alignItems: 'center', width: '100%' }}>
          <ImageBackground
            source={cover}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 8,
              overflow: 'hidden',
            }}
          />
          <View style={styles.avatarWrapper}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
              }}
              onPress={handlePickImage}>
              <Image
                source={avatar}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 60, height: 40, justifyContent: 'flex-end', alignItems: 'center' }}>
          {profile.isUpdating ? (
            <TextInput
              value={profile.name}
              onChangeText={(value) => setProfile({ ...profile, name: value })}
              style={{ fontSize: 18, borderBottom: 'solid 1px black', width: '60%' }}
            />
          ) : (
            <Text style={{ fontSize: 18 }}>{profile.name}</Text>
          )}
        </View>
      </View>
      <PaddingView>
        <View style={{ alignItems: 'flex-end', margin: 8 }}>
          <TouchableOpacity onPress={handleUpdate}>
            <FontAwesome5
              name={profile.isUpdating ? 'user-check' : 'pencil-alt'}
              size={18}
              color={profile.isUpdating ? colors.primary : colors.gray}
            />
          </TouchableOpacity>
        </View>
        <RenderItem
          icon="transgender"
          title={`Giới tính ${profile.gender ? 'Nam' : 'Nữ'}`}
          updating={
            profile.isUpdating && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 15 }}>Giới tính:</Text>
                <RadioButton
                  label="Nam"
                  checked={profile.gender}
                  onPress={() => setProfile({ ...profile, gender: true })}
                />
                <RadioButton
                  label="Nữ"
                  checked={!profile.gender}
                  onPress={() => setProfile({ ...profile, gender: false })}
                />
              </View>
            )
          }
        />
        <RenderItem icon="birthday-cake" title="Ngày sinh 24/08/1997" />
        <RenderItem icon="phone-alt" title="Điện thoại 0366918587" />
        <RenderItem icon="lock" title="Khóa định danh" />
        <View style={styles.center}>
          <View style={styles.viewUserId}>
            <Text style={styles.userId}>{(auth.user_id || defaultUuid).replace(/-/g, '')}</Text>
          </View>
        </View>
        <View style={styles.center}>
          <QRCode value={auth.user_id} size={200} />
        </View>
      </PaddingView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    marginVertical: 12,
  },
  viewUserId: {
    width: '80%',
    backgroundColor: '#eaeaea',
    borderRadius: 10,
    padding: 14,
  },
  userId: {
    letterSpacing: 5,
  },
  textYourKey: {
    fontSize: 16,
    marginTop: 5,
  },
  textInfo: {
    fontStyle: 'italic',
    fontSize: 13,
    marginTop: 4,
  },
  buttonShare: {
    alignItems: 'center',
    marginVertical: 20,
  },
  viewShare: {
    borderRadius: 18,
    height: 38,
    width: 160,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textShare: {
    color: colors.white,
    marginLeft: 14,
  },
  buttonCopy: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 10,
  },
  textCopy: {
    color: colors.primary,
    marginLeft: 8,
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    bottom: -50,
    position: 'absolute',
    borderColor: colors.white,
    borderWidth: 3,
    overflow: 'hidden',
    padding: 0,
    backgroundColor: colors.white,
  },
});
