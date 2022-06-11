import {Text, TouchableOpacity, View} from 'react-native';

import React from "react";
import {styles} from './styles';

const ListItem = ({ item, onPressItem})=>{
    return(
        <View style={styles.containerItem}> 
            {/* key es el id unico de cada task de la lista */}
              {/* idx:posición */}
                <Text style={styles.item}>{item.value}</Text>
                <TouchableOpacity style={styles.deleteButton} 
                onPress={()=>onPressItem(item.id)}>
                <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
            </View>
      )
}
export default ListItem;