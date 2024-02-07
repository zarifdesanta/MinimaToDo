import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ItemCard from "../components/ItemCard";
import AddModal from "../components/AddModal";
import { setData, getData, clearAllData } from "../helper/SaveLoad";
import uuid from "react-native-uuid";

const ToDoScreen = ({ primaryTheme, seconderyTheme, textTheme }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");

  const addTodo = () => {
    const todoObj = {
      id: uuid.v4(),
      data: todo,
      done: false,
    };
    todoList.push(todoObj);
    setTodoList(todoList);
    setData("todoList", todoList);
    hideModal();
  };

  useEffect(() => {
    async function loadAllData() {
      const loadedList = await getData("todoList");
      console.log(loadedList);
      if (loadedList != null) {
        setTodoList(loadedList);
      } else {
        setTodoList([]);
      }
      // console.log(loadedList);
    }
    // clearAllData();
    loadAllData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: seconderyTheme() }]}>
        {/**Card View */}
        <ScrollView contentContainerStyle={{ gap: 0 }}>
          {todoList
            .sort((a, b) => a.done - b.done)
            .map((item, index) => {
              return (
                <ItemCard
                  key={item.id}
                  todo={item.data}
                  primaryTheme={primaryTheme}
                  seconderyTheme={seconderyTheme}
                  textTheme={textTheme}
                  id={item.id}
                  todoList={todoList}
                  setTodoList={setTodoList}
                ></ItemCard>
              );
            })}
        </ScrollView>

        {/**Add Modal */}
        <AddModal
          modalVisible={modalVisible}
          hideModal={hideModal}
          primaryTheme={primaryTheme}
          seconderyTheme={seconderyTheme}
          textTheme={textTheme}
          setTodo={setTodo}
          addTodo={addTodo}
        ></AddModal>

        {/**FAB */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.fab, { backgroundColor: primaryTheme() }]}
        >
          <Icon name="plus" size={36} color={textTheme()}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToDoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  fab: {
    position: "absolute",
    right: 15,
    bottom: 15,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 5,
  },
});
