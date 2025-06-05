import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../assets/styles/home.styles';
import { COLORS } from '../constants/colors';
import {formatDate} from "../lib/utils.js";

const COTEGORY_ICONS = {
    "Food & Drinks": "fast-food",
    Shopping: "cart",
    Transportation:"car",
    Entertainment: "film",
    Bills: "receipt",
    Income: "cash",
    Other:"ellipsis-horizontal"
};

const TransactionItem = ({item, onDelete}) => {
  return (
    <View style={styles.transactionCard} key={item?.id}> 
      <TouchableOpacity style={styles.transactionContent} >
        <View style={styles.categoryIconContainer}>
            <Ionicons/>
        </View>
        <View>
            <Text> {item.title} </Text>
            <Text> {item.category} </Text>
        </View>
        <View>

        </View>
      </TouchableOpacity>
    </View>
  )
}

export default TransactionItem