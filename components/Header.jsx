import { Text, Button, View, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <>
            <View style={styles.buttonContainer}>
                {/* <Button
                    onPress={() => {
                        console.log('You tapped the button!');
                    }}
                    title="Press Me"
                    color="green"
                /> */}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 360,
        height: 80,
        backgroundColor: 'powderblue',
    },
});