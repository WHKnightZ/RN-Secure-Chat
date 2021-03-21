import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, PaddingView, HeaderBar } from '../../components';

const Stack = createStackNavigator();

interface Props {
  navigation: { push: any; navigate: any; goBack: any };
}

const Group: React.FC<Props> = (props) => {
  const { navigation } = props;

  return (
    <ScrollView>
      <HeaderBar title="Nhóm" items={['scanqr', 'search']} />
      <PaddingView></PaddingView>
    </ScrollView>
  );
};

const GroupStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Group" component={Group} />
    </Stack.Navigator>
  );
};

export default GroupStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
