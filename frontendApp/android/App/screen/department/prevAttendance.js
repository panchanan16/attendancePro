import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { useWindowDimensions } from 'react-native';
import { styles } from './prevStyle';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PrevAttendance = () => {
    const { width, height } = useWindowDimensions();
    return (
        <SafeAreaView style={{ backgroundColor: '#f0f0f5', height: '100%', flex: 1 }}>
            <View style={[styles.abox, { height: height / 6 }]}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <Text style={styles.heading}>BCA 1st sem</Text>
                    <View style={styles.headBox}>
                        <View style={styles.iconBox}>
                            <Entypo name="open-book" size={20} color="black" />
                            <Text style={styles.subheading}>Web development</Text>
                        </View>
                        <View style={styles.iconBox}>
                            <FontAwesome5 name="book-reader" size={20} color="black" />
                            <Text style={{ ...styles.subheading  }}>Total class - 200</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ height: '78%' }}>
                <ScrollView style={styles.container}>
                    {
                        [1, 2, 3, 4, 400, 3, 3, 3, 3, 3, 3].map((el, key) => (
                            <View key={key} style={styles.student}>
                                <View style={styles.studentBox}>
                                    <MaterialCommunityIcons name="face-man" size={24} color="black" />
                                    <Text>Panchanan deka</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                    <View style={{ ...styles.status, backgroundColor: '#ff4d4d' }}>
                                        <View><Text style={{ color: 'white', fontWeight: 'bold' }}>100</Text></View>
                                    </View>
                                    <View style={{ ...styles.status, backgroundColor: '#53c68c' }}>
                                        <View><Text style={{ color: 'white', fontWeight: 'bold' }}>12</Text></View>
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default PrevAttendance                  