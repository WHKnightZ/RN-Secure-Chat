import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../../components/Text';
import AddContact from './AddContact';

function Directory() {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>Danh bạ!</Text>
      <AddContact />
    </View>
  );
}

export default Directory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
