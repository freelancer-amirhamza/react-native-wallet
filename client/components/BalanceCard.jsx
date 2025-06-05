import { View, Text } from 'react-native'
import { styles } from "../assets/styles//home.styles.js";
import { COLORS } from '../constants/colors.js';

const BalanceCard = ({ summery }) => {
    return (
        <View style={styles.balanceCard} >
            <Text style={styles.balanceTitle} >Total Balance</Text>
            <Text style={styles.balanceAmount}>{parseFloat(summery?.balance).toFixed(2)} </Text>
            <View style={styles.balanceStats}>
                <View style={styles.balanceStatItem}>
                    <Text style={styles.balanceStatLabel}>Income</Text>
                    <Text style={styles.balanceStatAmount}>
                        +${parseFloat(summery?.income).toFixed(2)}
                    </Text>
                </View >
                <View style={[styles.balanceStatItem, styles.statDivider]} />
                <View style={styles.balanceStatItem}>
                    <Text style={styles.balanceStatLabel}>Expenses</Text>
                    <View />
                    <Text style={styles.balanceStatAmount} >
                        -${Math.abs(parseFloat(summery?.expenses)).toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default BalanceCard