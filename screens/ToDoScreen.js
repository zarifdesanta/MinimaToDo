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
import { setData, getData } from "../helper/SaveLoad";

const ToDoScreen = ({ primaryTheme, seconderyTheme, textTheme }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");

  const addTodo = () => {
    const todoObj = {
      data: todo,
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
      console.log(loadedList);
    }

    loadAllData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: seconderyTheme() }]}>
        {/**Card View */}
        <ScrollView contentContainerStyle={{ gap: 0 }}>
          {todoList.map((item, id) => {
            return (
              <ItemCard
                key={id}
                todo={item.data}
                primaryTheme={primaryTheme}
                seconderyTheme={seconderyTheme}
                textTheme={textTheme}
                id={id}
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
