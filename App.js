import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, TextInput, FlatList } from 'react-native';
import SingleTodo from './components/SingleTodo';

const App = () => {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (!todo) return alert("Please enter a todo");
    setTodos([...todos, { id: Date.now(), text: todo }]);
    setTodo("");
  };

  const fetchTodos = async() => {
    const data = AsyncStorage.getItem('todos');
    if(data) setTodos(JSON.parse(data));
  }

  useEffect(()=>{
    fetchTodos()
  }, [])

  return(
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>
      <View style={styles.inputContainer}>
        <TextInput value={todo} onChangeText={(text)=>setTodo(text)} style={styles.input} placeholder="Enter a Todo"/>
        <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
          <Text>Go</Text>
        </TouchableOpacity>
      </View>

      {/*  Using ScrollView and map() */}
      {/* <View>
        <ScrollView>
          {todos.map((todo) => (
            <Text key={todo.id}>{todo.text}</Text>
          ))}
        </ScrollView>
      </View> */}

      {/* Using FlatList because it is react native way rather than usinf ScrollView and map()*/}
      <View style={{width:"100%", marginTop: 10}}>
        <FlatList
        data={todos}
        renderItem={({item}) => (
          <SingleTodo todo={item} todos={todos} setTodos={setTodos}/>
        )}
        keyExtractor={(item)=> item.id.toString()}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F7DAD9",
  },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "700",
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  input: {
    elevation: 10,
    shadowColor: "black",
    backgroundColor: "white",
    flex: 1,
    marginRight: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  button: {
    padding: 13,
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 10,
  },
});

export default App;