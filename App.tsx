import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore'
import { Appbar, TextInput, Button } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import Todo from './component/todo'

// firestore().collection("Produce").add(
//   {
//     name: "Tai",
//     price: 1000
//   }
// ).then(
//   ()=>console.log("Add new project")
// )

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [todo,setTodo] = React.useState('');
  const [todos,setTodos] = React.useState([]) as any;
  const ref = firestore().collection('todos');

  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }

  React.useEffect(() => {
    return ref.onSnapshot(querySnapshot =>{
      const list:any[] = [];
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });
      setTodos(list);

      if(loading){
        setLoading(false);
      }
    });
  });

  if(loading){
    return null;
  }

  return (
    <View style={{flex:1}}>
      <Appbar>
        <Appbar.Content title={'TODOs List'}/>
      </Appbar>
      <FlatList 
        style={{flex:1}}
        data={todos}
        keyExtractor={(item)=>item.id}
        renderItem={({item}) => <Todo {...item} />}/>
      <TextInput label={'New Todo'} value={todo} onChangeText={(text)=>setTodo(text)}/>
      <Button onPress={addTodo}>Add TODO</Button>
      
    </View>
  );
}

export default App

const styles = StyleSheet.create({})