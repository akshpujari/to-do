import React, { useState } from "react";
import axios from "axios";

const Context = React.createContext({
  data: [],
  doneData: [],
  delete: "",
  addData: (value) => {},
  getdata: () => {},
  updateData: (id, value, isDone) => {},
  moveToDO: (id, value, isDone) => {},
  removeData: (id) => {},
});

export const ContextProvider = (prop) => {
  const [initial, setInitial] = useState([]);
  const [done, setDone] = useState([]);
  const [deleted, setDeleted] = useState();

  const addDataHandler = (value) => {
    fetch("https://to-do-3a1a9-default-rtdb.firebaseio.com/todo.json", {
      method: "POST",
      body: JSON.stringify({
        value,
        isDone: false,
      }),
    });
    console.log("Submitted");
  };

  const getdatahandler = () => {
    axios
      .get("https://to-do-3a1a9-default-rtdb.firebaseio.com/todo.json")
      .then((response) => {
        const newData = [];
        const newDone = [];
        var responseData = response.data;
        console.log("response", response.data);
        for (let key in responseData) {
          console.log("key", key);
          if (!responseData[key].isDone) {
            newData.push({
              id: key,
              value: responseData[key].value,
              isDone: responseData[key].isDone,
            });
          } else {
            newDone.push({
              id: key,
              value: responseData[key].value,
              isDone: responseData[key].isDone,
            });
          }
          setInitial(newData);
          setDone(newDone);
        }
      });
    console.log("initial", initial);
  };

  const updateDatahandler = async (id, value, isDone) => {
    const data = { value: value, isDone: true };
    await axios
      .put(
        `https://to-do-3a1a9-default-rtdb.firebaseio.com/todo/${id}.json`,
        data
      )
      .then((res) => {
        console.log("Update Response", res);
        console.log(res.data);
        const posts = initial.filter((item) => item.id !== id);
        console.log("post", posts);
        setInitial(posts);
        const doneItem = initial.find((item) => item.id === id);
        const doneItems = [...done];
        console.log("doneItem", doneItem, done, doneItems);
        doneItems.push({
          id: doneItem.id,
          value: doneItem.value,
          isDone: doneItem.isDone,
        });
        setDone(doneItems);
        console.log("done", doneItems);
      });
  };

  const moveToDOhandler = async (id, value, isDone) => {
    const data = { value: value, isDone: false };
    await axios
      .put(
        `https://to-do-3a1a9-default-rtdb.firebaseio.com/todo/${id}.json`,
        data
      )
      .then((res) => {
        console.log("Update Response", res);
        console.log(res.data);
        const posts = done.filter((item) => item.id !== id);
        console.log("post", posts);
        setDone(posts);
        const toDOItem = done.find((item) => item.id === id);
        const toDOItems = [...initial];
        console.log("doneItem", toDOItem, done, toDOItems);
        toDOItems.push({
          id: toDOItem.id,
          value: toDOItem.value,
          isDone: toDOItem.isDone,
        });
        setInitial(toDOItems);
        console.log("done", toDOItems);
      });
  };

  const removeDataHandler = (id, value) => {
    axios
      .delete(`https://to-do-3a1a9-default-rtdb.firebaseio.com/todo/${id}.json`)
      .then((res) => {
        console.log("Delete Response", res);
        if (res.status === 200) {
          console.log("deleted");
          const newMsg = <>{value} is deleted</>;

          setDeleted(newMsg);
        }
        const posts = done.filter((item) => item.id !== id);
        console.log("post", posts);
        setDone(posts);
      });
  };

  const contextValue = {
    data: initial,
    doneData: done,
    delete: deleted,
    addData: addDataHandler,
    getdata: getdatahandler,
    updateData: updateDatahandler,
    moveToDO: moveToDOhandler,
    removeData: removeDataHandler,
  };

  return (
    <Context.Provider value={contextValue}>{prop.children}</Context.Provider>
  );
};

export default Context;
