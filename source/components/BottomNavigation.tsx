import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppSelector } from "../../config/Hooks";


const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

type BottomProps = {
    data: string[]
    init: string
    onChangePage: (index: string) => void
}

const BottomNavigation = (props: BottomProps) => {

    const [key, setKey] = useState(props.init)

    const dataPlayer = useAppSelector(state => state.player)

    useEffect(() => {
        props.onChangePage(key)
    }, [])

    const onClickItem = (key: string) => {
        setKey(key)
        props.onChangePage(key)
    }

    return (
        <View style={{ backgroundColor: '#26292D' }}>
            <View style={[styles.container, dataPlayer.showBottomPlayer
                ? styles.borderRadiusWithBottomPlayer : styles.borderRadiusWithoutBottomPlayer]}>
                {props.data.map((item: string) => {
                    return <View style={styles.item}>
                        <TouchableOpacity style={styles.touchButton} onPress={onClickItem.bind(this, item)}>
                            {key === item ? <Icon size={25} name={item} color='white' />
                                : <Icon size={25} name={item} color='gray' />}
                        </TouchableOpacity>
                    </View>
                })}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#373A3E',
        justifyContent: 'space-evenly',
        alignContent: 'stretch',
        flexDirection: 'row',
        height: SCREEN_HEIGHT * 0.1,
        width: SCREEN_WIDTH,
    },
    borderRadiusWithBottomPlayer: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    borderRadiusWithoutBottomPlayer: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    item: {
        alignSelf: 'center',
    },
    touchButton: {
        alignItems: 'center'
    },
    text: {
        fontSize: 10
    }
})

export default BottomNavigation;
