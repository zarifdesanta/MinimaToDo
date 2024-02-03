import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors } from "../helper/ColorPalette";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import OptionModal from "./OptionModal";

const ItemCard = ({
  todo,
  primaryTheme,
  seconderyTheme,
  textTheme,
  id,
  todoList,
  setTodoList,
}) => {
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const showOptionModal = () => {
    setOptionModalVisible(true);
    //console.log(id);
  };
  const hideOptionModal = () => setOptionModalVisible(false);

  return (
    <>
      <OptionModal
        modalVisible={optionModalVisible}
        hideModal={hideOptionModal}
        primaryTheme={primaryTheme}
        seconderyTheme={seconderyTheme}
        textTheme={textTheme}
        todoList={todoList}
        setTodoList={setTodoList}
        id={id}
      ></OptionModal>

      <View style={[styles.cardContainer, { backgroundColor: primaryTheme() }]}>
        {/**Todo text */}
        <Text style={{ fontSize: 20, color: textTheme() }}>{todo}</Text>
        {/**Option Button */}
        <TouchableOpacity onPress={() => showOptionModal()}>
          <Icon name="dots-vertical" size={22} color={textTheme()}></Icon>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 7.5,
  },
});
