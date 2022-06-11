import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {List, Modal} from './src/components/index';
import React, {useState} from 'react';

import { HORIZONTAL } from 'react-native/Libraries/Components/ScrollView/ScrollViewContext';
import { themes } from './src/contantes/themes/index';

//useState está dentro de react por eso en llavaes, en cambio React es una clase por eso va sin llaves
// el StyleSheet: permite crear un objeto de estilos en formato JSON, el cual lo usaremos en nuestro componenete
//import { StatusBar } from 'expo-status-bar';
export default function App() {
  const[task, setTask]=useState("");
  const[tasks, setTasks]=useState([]);//lista donde estará los tasks
  const[modalVisible, setModalVisible]=useState(false);
  const[itemSelected, setItemSelected]= useState({});//entre llaves porque es un objeto

const onHandleInput = (text) =>{
  //console.warn(text);para poder ver que posee la consola
  setTask(text);
};

const onHandleSubmit = () =>{
  console.log('Se presionó el botón ADD')
  setTasks(currentTasks => [//currentTasks: callback, estado actual  del tasks
    ...currentTasks,
    { id:Math.random(),value:task}
  ]);//crear una copia del valor anterior
  setTask("");//Para poder actualizar el TextInput despues de presionar el boton
};

const onHandleDelete= (itemSelected)=> {
  setTasks(currentTasks=>currentTasks.filter(task=>task.id!==itemSelected.id));
  setItemSelected({});
  setModalVisible(!modalVisible);
};

const onHandleModal=(id)=>{
setItemSelected(tasks.filter(item=>item.id == id)[0]);//filter:busca el item sea igual al elemento que pasamos a traves del modal
setModalVisible(!modalVisible);//(!)modalVisible:inversa de true
}; 

//console.warn({tasks}); //para poder visulizar la consola
  return (
    <View style={themes.container}>
    <View style={styles.containerTask}>
      <TextInput style={styles.textInput} 
      placeholder='ADD NEW TASK' 
      value={task} //valor del Input debe de ser task y se guardará en setTask
      onChangeText={onHandleInput}//retornara el valor del input
      />

      <Button 
      title='ADD' 
      color="#8CBCB9" 
      onPress={()=> onHandleSubmit()} 
      disabled={task.length==0}//el boton se activa cuando escribes algo en el textinput
      />
    </View>

    <List
    tasks={tasks} 
    onPressItem={onHandleModal}
    />

    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={()=>null}//no acciona nd
      >
        <View style={styles.modalContent}>
          <View style={styles.ModalTitleContainer}> 
          <Text style={styles.ModalTitle}>Mi Modal</Text>
          <TouchableOpacity //hace touchable a cualquier variable
          style={styles.deleteButton} 
          onPress={()=>setModalVisible(!modalVisible)}>
            <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        <Text style={styles.ModalText}>¿Estás seguro de borrar el elemento?</Text>
        <Text style={styles.ModalComent}> El elemento es {itemSelected.value}</Text>
        <Button title="Delete Item" onPress={()=> onHandleDelete(itemSelected)}/>
        {/* simplemente es un boton */}
        </View>
    </Modal>
    </View> 
  );
}

const styles = StyleSheet.create({
  containerTask:{
    flexDirection:"row",
    justifyContent: "space-around",//horizontal
    //alignContent:"center",//vertical
    alignItems:"center",
    paddingHorizontal: 25,
    marginTop:30,
  },
  textInput:{
    borderColor: "#8CBCB9", // color del borde
    borderBottomWidth: 1,//medida de la linea debajo del texto
    marginBottom: 10,
    width: "60%",
    height: 40,
    fontSize: 14,
    color: "#212121",
  },
  
  containerItem:{
    marginVertical:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item:{
    fontSize: 14,
    color: "#212121", 
  },
  deleteButton:{
    backgroundColor: "#8CBCB9",
    paddingHorizontal: 15,
    paddingVertical:5,
  },
  deleteButtonText:{
    color: "#ffffff",
    fontSize:14,
    fontWeight: 'bold',
  },
  modalContent:{
    flex:1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    justifyContent:'center',
  },
  ModalTitle:{
    fontSize:18,
    fontWeight:'bold',
    marginVertical: 20,
    marginHorizontal:20,
  },
  ModalText:{
    fontSize:16,
    marginVertical:10,
  },
  ModalComent:{
    fontSize:16,
    fontWeight:'bold',
    marginVertical: 10,
  },
  ModalTitleContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  }
});