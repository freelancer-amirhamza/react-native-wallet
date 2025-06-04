import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '../../hooks/useTransactions';
import { useEffect } from 'react';
import PageLoader from '../../components/PageLoader';
import { styles } from "@/assets/styles/home.styles.js";
import { Ionicons } from "@expo/vector-icons"
export default function Page() {
    const { user } = useUser();
    const { transactions, summery, loading, laodData, deleteTransaction } = useTransactions(user?.id);

    useEffect(() => { laodData() }, [laodData])

    if (loading) return <PageLoader />
    // {user?.emailAddresses[0].emailAddress}
    return (
        <View style={styles.container} >
            <View style={styles.content} >
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={styles.headerLogo}
                            resizeMode='contain'
                        />
                        <View style={styles.welcomeContainer} >
                            <Text style={styles.welcomeText} >Welcome,</Text>
                            <Text style={styles.usernameText} >{user?.emailAddresses[0]?.emailAddress.split("@")[0]}</Text>
                        </View>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => router.push("/create")}
                        >
                            <Ionicons name='add' size={24} color={"white"} />
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                        <SignOutButton />
                    </View>
                </View>
            </View>

        </View>
    )
}