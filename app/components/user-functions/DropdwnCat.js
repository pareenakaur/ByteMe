import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {Text, View, StyleSheet} from 'react-native';

export default function DropdownCat({setCatInReport}){
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Opening Hours', value: 'Opening Hours' },
        { label: 'Crowdness' , value: 'Crowdness' },
        { label: 'Hygiene', value: 'Hygiene' },
        { label: 'Customer Service', value: 'Customer Service' },
        { label: 'Others', value: 'Others' }
    ]);
    
    return (
        <View style={styles.container}>
            <Text style={{paddingBottom: 5}}>Select Report Catergory: </Text>
            <DropDownPicker
            placeholder='Choose Here!'
            placeholderStyle={{
                color: "grey",
                fontSize: 16,
                paddingLeft:5
              }}
            maxHeight={600}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
                borderRadius: 15,
                height: 60
              }}
            dropDownContainerStyle={{
                borderRadius: 15,
            }}
            listItemLabelStyle={{
                color: "black",
                fontSize: 16,
                paddingLeft: 5
              }}
            labelStyle={{
                fontSize:16,
                paddingLeft: 5
            }}
            onChangeValue={setCatInReport}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 325,
        paddingBottom: 20,
        // height: 100
    }
})