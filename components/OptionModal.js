import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { setData } from "../helper/SaveLoad";

const OptionModal = ({
  modalVisible,
  hideModal,
  primaryTheme,
  seconderyTheme,
  textTheme,
  todoList,
  setTodoList,
  id,
}) => {
  const deleteItem = () => {
    let copyList = [...todoList];
    copyList.splice(id, 1);
    setTodoList(copyList);
    setData("todoList", copyList);
    hideModal();
  };

  const [newText, setNewText] = useState("");

  const setNewData = () => {
    let copyList = [...todoList];
    copyList[id].data = newText;
    setTodoList(copyList);
    setData("todoList", copyList);
    hideModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => hideModal()}
    >
      <TouchableOpacity onPress={() => hideModal()} style={{ flex: 1 }}>
        <View style={styles.centeredView}>
          <View
            style={[styles.modalView, { backgroundColor: seconderyTheme() }]}
          >
            <TextInput
              onChangeText={(text) => setNewText(text)}
              style={[
                styles.modalInput,
                {
                  borderColor: textTheme(),
                  color: textTheme(),
                  backgroundColor: primaryTheme(),
                },
              ]}
              placeholderTextColor={textTheme()}
              placeholder={todoList[id].data}
            ></TextInput>

            {/**Button view */}
            <View style={{ flexDirection: "row", gap: 15 }}>
              {/**Save button */}
              <TouchableOpacity
                onPress={() => setNewData()}
                style={[
                  styles.modalButton,
                  { backgroundColor: primaryTheme() },
                ]}
              >
                <Text style={[styles.textStyle, { color: textTheme() }]}>
                  Save
                </Text>
              </TouchableOpacity>

              {/**Delete button */}
              <TouchableOpacity
                onPress={() => deleteItem()}
                style={[
                  styles.modalButton,
                  { backgroundColor: primaryTheme() },
                ]}
              >
                <Text style={[styles.textStyle, { color: textTheme() }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default OptionModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 15,
    borderRadius: 20,
    padding: 15,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    elevation: 5,
  },
  modalInput: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 20,
    width: "95%",
    height: 50,
    padding: 15,
    fontSize: 16,
  },
  modalButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 15,
    width: 100,
    height: 40,
  },
});
