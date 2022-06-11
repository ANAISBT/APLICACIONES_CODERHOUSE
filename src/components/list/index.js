import { FlatList } from "react-native";
import ListHeader from './list-header/index';
import ListItem from './list-item/index';
import React from "react";
import {styles} from './styles';

const List =(tasks, onPressItem )=>{

    const ListHeaderComponent = ()=> {
        return tasks.length>0 && < ListHeader title = 'Task List'/>;
      };

      const renderItem=({item})=>{
        <ListItem item={item} onPressItem={onPressItem}/>
    }

    const keyExtractor=(item)=> item.id.toString();
    
    return(
    <FlatList 
    ListHeaderComponent={ListHeaderComponent}//Cabezera
    data={tasks}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
    style={styles.containerList}
    />
    )
}
export default List;