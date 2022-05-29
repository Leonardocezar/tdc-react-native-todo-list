import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Assets from '@images/Assets';

export const App = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useState('');

  const addTodo = () => {
    if (todo.length === 0) {
      return Alert.alert('Input is empty');
    }
    setTodos([...todos, todo]);
    setTodo('');
  };

  const deleteTodo = (todoIndex: number) => {
    Alert.alert('Delete todo', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'default',
        onPress: () =>
          setTodos(prevstate => {
            return prevstate?.filter((v, index) => index !== todoIndex);
          }),
      },
    ]);
  };

  const deleteAllTodos = () => setTodos([]);

  const renderTodo = ({item: t, index}: {item: string; index: number}) => {
    return (
      <View key={index} style={styles.containerTodo}>
        <Text style={styles.labelTodo}>{`${index + 1} : ${t}`}</Text>
        <Pressable
          style={styles.buttonDelete}
          onPress={() => deleteTodo(index)}>
          <Text style={styles.buttonDeleteLabel}>Delete</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={Assets.bookIcon} style={styles.image} />
        <TextInput
          style={styles.input}
          value={todo}
          onChangeText={text => setTodo(text)}
          onSubmitEditing={addTodo}
        />
        <Pressable style={styles.buttonAdd} onPress={addTodo}>
          <Text>Add</Text>
        </Pressable>
      </View>
      <FlatList
        ListEmptyComponent={<Text>No todo found, Add first one </Text>}
        data={todos}
        renderItem={renderTodo}
        contentContainerStyle={styles.flatlist}
      />
      <Pressable style={styles.buttonCleanAll} onPress={deleteAllTodos}>
        <Text>Delete All</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFCB94',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 24,
  },
  image: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
    padding: 10,
    marginRight: 10,
  },
  buttonAdd: {
    height: 50,
    borderRadius: 4,
    backgroundColor: '#fc8b12',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  flatlist: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  containerTodo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  labelTodo: {
    fontSize: 13,
  },
  buttonDelete: {
    borderRadius: 4,
    backgroundColor: '#FA0303',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonDeleteLabel: {
    color: '#fff',
  },
  buttonCleanAll: {
    height: 50,
    borderRadius: 4,
    backgroundColor: '#fc8b12',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginHorizontal: 24,
    alignItems: 'center',
  },
});
