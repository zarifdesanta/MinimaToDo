import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../helper/ColorPalette";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import OptionModal from "./OptionModal";
import { getData, setData } from "../helper/SaveLoad";

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

  const [isDone, setIsDone] = useState(false);

  const handleSetIsDone = () => {
    setIsDone(!isDone);
    //use id, todoList, setTodoList to set new data
    let copyTodoList = [...todoList];
    copyTodoList.filter((item) => item.id == id)[0].done = !isDone;
    // console.log(thisItem[0].done);
    // thisItem[0].done = !isDone;
    setTodoList(copyTodoList);
    //save new list
    setData("todoList", copyTodoList);
  };

  const handleCheckButtonUI = () => {
    if (!isDone) {
      return "checkbox-blank-circle-outline";
    } else {
      return "check-circle";
    }
  };

  const handleCheckTextUI = () => {
    if (!isDone) {
      return "none";
    } else {
      return "line-through";
    }
  };

  useEffect(() => {
    async function getAllData() {
      const tL = await getData("todoList");
      if (tL.filter((item) => item.id == id)[0] != null) {
        setIsDone(tL.filter((item) => item.id == id)[0].done);
      }
    }

    getAllData();
  }, []);

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
        <TouchableOpacity
          style={{
            paddingRight: 10,
            paddingLeft: 0,
            paddingTop: 4,
            paddingBottom: 5,
          }}
          onPress={() => handleSetIsDone()}
        >
          <Icon
            name={handleCheckButtonUI()}
            size={22}
            color={textTheme()}
          ></Icon>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => showOptionModal()}
          style={{ flex: 1, flexDirection: "row" }}
        >
          <Text
            style={{
              fontSize: 20,
              color: textTheme(),
              textDecorationLine: handleCheckTextUI(),
            }}
          >
            {todo}
          </Text>
          {/**Option Button */}
          <TouchableOpacity
            style={{
              paddingLeft: 10,
              paddingTop: 5,
              paddingBottom: 5,
              marginLeft: "auto",
            }}
            onPress={() => showOptionModal()}
          >
            <Icon name="dots-vertical" size={22} color={textTheme()}></Icon>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 60,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 0,
    marginBottom: 0,
    marginVertical: 15,
  },
});
