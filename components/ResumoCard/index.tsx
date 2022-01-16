import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Title, useTheme } from 'react-native-paper';
import { theme } from '../../theme/theme';

export const ResumoCard = () => {
    return(
        <>
      
        <Pressable style={({pressed}) => [
            {
                borderColor: pressed ? theme.colors.primary : theme.colors.disabled,
                borderWidth:pressed ? 2 : 1
            },
            styles.container
        ]} onPress={() => console.log('clicado')}>

            <View >                
            <Ionicons name="alarm-outline" size={26} color="orange" />
            <Title style={styles.title} >Serviços {"\n"}Solicitados</Title>
           
            </View>

            <View style={styles.lineFooter}>
            <Title style={styles.title} >2</Title>
            <Text style={styles.btnVer}>Ver</Text>
            </View>
            
        </Pressable>
        
        </>
    )
}

const styles = StyleSheet.create({
    container: {
       
        borderRadius:4,
        paddingVertical:8,
        paddingHorizontal:10,
        width: '40%',
        height: 150,
    },
    title:{
        fontSize:16,
    },
    pressed:{
        backgroundColor:'#abeafe'
    },
    subtitleCard:{
        fontSize:14,
    },
    lineFooter: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop:10,
        alignItems:'center'

    },
    btnVer: {
        color: theme.colors.primary,
    }

})