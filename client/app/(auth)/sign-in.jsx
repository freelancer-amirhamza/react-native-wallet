import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { styles } from '../../assets/styles/auth.style'
import { COLORS } from '../../constants/colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error,setError] = useState("")

    // Handle the submission of the sign-in form
    const onSignInPress = async () => {
        if (!isLoaded) return

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            setError(err.errors?.[0]?.message)
        }
    }

    return (
        <KeyboardAwareScrollView style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                     extraScrollHeight={20}
                    >
                    
           <View style={styles.container} >
            <Image style={styles.illustration}
            source={require("../../assets/images/revenue-i4.png")} />
             <Text style={styles.title} >Welcome to Login</Text>
            {error ? (
                        <View style={styles.errorBox} >
                            <Ionicons name='alert-circle' size={20} color={COLORS.expense} />
                            <Text style={styles.errorText} >{error || "something is wrong!"}</Text>
                            <TouchableOpacity onPress={() => setError("")}>
                                <Ionicons name='close' size={20} color={COLORS.textLight} />
                            </TouchableOpacity>
                        </View>
                    ) : null}
            <TextInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Enter email"
                placeholderTextColor="#9A8478"
                style={[styles.input, error && styles.errorInput ]}
                onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
            />
            <TextInput
                value={password}
                placeholder="Enter password"
                secureTextEntry={true}
                placeholderTextColor="#9A8478"
                style={[styles.input, error && styles.errorInput ]}
                onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity 
            style={styles.button}
            onPress={onSignInPress}>
                <Text style={styles.buttonText} >Login</Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText} >Don&apos;t have an account?</Text>
                <Link href="/sign-up" asChild>
                <TouchableOpacity >
                    <Text style={styles.linkText} >Sign up</Text>
                </TouchableOpacity>
                </Link>
                
            </View>
           </View>
        </KeyboardAwareScrollView>
    )
}