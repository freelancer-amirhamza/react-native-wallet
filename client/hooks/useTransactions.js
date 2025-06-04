import { useCallback, useState } from "react";
import { Alert } from "react-native";
const API_URL = "https://react-native-wallet-api.onrender.com/api/transaction";

export const useTransactions = (userId) => {
    const [transactions, setTransactions] = useState([]);
    const [summery, setSummery] = useState({
        balance: 0,
        income: 0,
        expenses: 0,
    });
    const [loading, setLoading] = useState(true);

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/get/${userId}`);
            const data = await response.json();
            setTransactions(data.transaction || []);
        } catch (error) {
            console.log(error.message);
        }
    }, [userId]);

    const fetchSummery = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/summery/${userId}`);
            const data = await response.json();
            setSummery(data.summery || { balance: 0, income: 0, expenses: 0 });
        } catch (error) {
            console.log(error.message);
        }
    }, [userId]);

    const laodData = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            await Promise.all([fetchTransactions(), fetchSummery()]);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }, [fetchSummery, fetchTransactions, userId]);

    const deleteTransaction = async (id) => {
        try {
            const response = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete transaction!");
            await laodData();
            Alert.alert("Success", "Transaction deleted successfully!");
        } catch (error) {
            console.log(error.message);
            Alert.alert("Error", error?.message);
        }
    };

    return { transactions, summery, loading, laodData, deleteTransaction };
}
