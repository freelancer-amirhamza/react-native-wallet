import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { API_URL } from '../../constants/api'


const categories = [
    {id: "food", name: "Food & Drinks", icon: "fast-food"},
    {id: "shopping", name: "Shopping", icon: "cart"},
    {id: "transportation", name: "Transportation", icon: "car"},
    {id: "entertainment", name: "Entertainment", icon: "film"},
    {id: "bills", name: "Bills", icon: "receipt"},
    {id: "income", name: "Income", icon: "cash"},
    {id: "other", name: "Other", icon: "ellipsis-horizontal"},
]
const create = () => {
    const router = useRouter();
    const {user} = useUser();
    const [title,setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isExpense, setIsExpense] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    const handleCreate = async ()=>{
        if(!title.trim()) return Alert.alert("Error", "Please enter a transaction title");
        if(!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            Alert.alert("Error", "Please select a category");
        }
        setIsLoading(true);
        try {
            const formatAmount = isExpense 
            ? -Math.abs(parseFloat(amount))
            : Math.abs(parseFloat(amount));

            const response = await fetch(`${API_URL}/transactions`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    useId: user.id,
                    title,
                    amount: formatAmount,
                    category: selectedCategory,
                })
            })

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || "Faild to create transaction");
            } else{
                Alert.alert("Success", "Transaction created successfully");
                router.back();
            }
        } catch (error) {
            Alert.alert("Error", error.message || "Faild to create transaction");
            console.log("Error creating transaction:",error);
        }finally{
            setIsLoading(false);
        }
    }
  return (
    <View>
      <Text>create</Text>
    </View>
  )
}

export default create