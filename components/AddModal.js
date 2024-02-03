import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

const AddModal = ({
  modalVisible,
  hideModal,
  primaryTheme,
  seconderyTheme,
  textTheme,
  setTodo,
  addTodo,
}) => {
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
              onChangeText={(text) => setTodo(text)}
              style={[
                styles.modalInput,
                {
                  borderColor: textTheme(),
                  color: textTheme(),
                  backgroundColor: primaryTheme(),
                },
              ]}
              placeholderTextColor={textTheme()}
              placeholder="Todo..."
            ></TextInput>
            <TouchableOpacity
              onPress={() => addTodo()}
              style={[styles.modalButton, { backgroundColor: primaryTheme() }]}
            >
              <Text style={[styles.textStyle, { color: textTheme() }]}>
                ADD
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddModal;

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
