import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SingleTodo({todo, todos, setTodos}) {

    const [edit, setEdit] = useState(false)
    const [editText, setEditText] = useState(todo.text);

    useEffect(() => {
        AsyncStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleDelete = (id) => {
      setTodos(todos.filter((t) => t.id !== id));
    };

    const handleEdit = () => {
        if (!edit) {
          setEdit(!edit);
        } else {
          setEdit(!edit);
          setTodos(
            todos.map((t) =>
              t.id === todo.id
                ? {
                    id: t.id,
                    text: editText,
                  }
                : t
            )
          );
        }
        AsyncStorage.setItem("todos", JSON.stringify(todos));
      };

    return (
        <View style={styles.todo}>

        {
            !edit ? <Text style={styles.todotext}>{todo.text}</Text> : (<TextInput onChangeText={(text) => setEditText(text)} style={styles.todoinput} value={editText}/>)
        }

            <TouchableOpacity>
                <MaterialIcons style={styles.todoaction} name="edit" size={24} color="black" onPress={handleEdit} />
            </TouchableOpacity>
            <TouchableOpacity>
                <MaterialIcons style={styles.todoaction} name="delete" size={24} color="black" onPress={()=>handleDelete(todo.id)}/> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: "row",
        marginHorizontal: 10,
        elevation: 5,
        shadowColor: "black",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 50,
    },
    todotext: {
        flex: 1,
        fontSize: 18,
        paddingVertical: 3,
        paddingHorizontal: 5,
    },
    todoinput: {
        flex: 1,
        fontSize: 18,
        paddingHorizontal: 5,
        borderRadius: 5,
        borderColor: "grey",
        borderWidth: 1,
    },
    todoaction: {
        marginLeft: 15,
    },
})
