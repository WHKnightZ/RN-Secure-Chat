import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { colors } from '../constants';

const Loading: React.FC = () => {
  return (
    <View style={styles.modalBackground}>
      <ActivityIndicator animating={true} size={40} color={colors.primary} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  modalBackground: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
