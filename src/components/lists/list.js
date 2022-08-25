import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonGroup, Collapse } from "@mui/material";
import Context from "../context/context";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import classes from "./list.module.css";

function Lists(props) {
  const contexts = useContext(Context);
  const datas = contexts.data;
  const deletes = contexts.delete;
  const donedata = contexts.doneData;
  const [list, setList] = useState([]);
  const [done, setDone] = useState([]);
  const [open, setOpen] = useState(false);
  // const [deleteMsg, setDeleteMsg] = useState(null);

  useEffect(() => {
    setList(datas);
    setDone(donedata);
    // setDeleteMsg(deletes);
  }, [datas, donedata, deletes]);

  useEffect(() => {
    contexts.getdata();
  }, []);

  const handleUpdate = (value) => () => {
    console.log("Update data", value);
    contexts.updateData(value.id, value.value, value.idDone);
  };

  const moveToDOhandler = (value) => () => {
    console.log("Update data", value);
    contexts.moveToDO(value.id, value.value, value.idDone);
  };

  const removeDone = (value) => () => {
    console.log("RemoveData", value);
    contexts.removeData(value.id, value.value);
  };

  const openHandler = (open) => () => {
    const opened = !open;
    setOpen(opened);
  };

  return (
    <div>
      <div className={classes.toDoName}>TO-DO LIST</div>{" "}
      <List dense>
        {list.map((list) => {
          return (
            <ListItem
              key={list.id}
              secondaryAction={
                <Button variant="contained" onClick={handleUpdate(list)}>
                  Done
                </Button>
              }
              disablePadding
            >
              <ListItemText id={list.id}>
                {!list.idDone ? list.value : null}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
      {/* <div>{deleteMsg}</div> */}
      <Button
        variant="text"
        style={{ margin: "10px", fontSize: "20px", color: "#5f6368" }}
        onClick={openHandler(open)}
      >
        Done List {open ? <ExpandLess /> : <ExpandMore />}
      </Button>{" "}
      <Collapse key="col" in={open} timeout="auto" unmountOnExit>
        <List dense>
          {done.map((doneList) => {
            return (
              <ListItem
                key={doneList.id}
                secondaryAction={
                  <ButtonGroup>
                    <Button
                      style={{ margin: "0px 10px" }}
                      variant="contained"
                      color="primary"
                      onClick={moveToDOhandler(doneList)}
                    >
                      To-do
                    </Button>
                    <Button variant="contained" onClick={removeDone(doneList)}>
                      X
                    </Button>
                  </ButtonGroup>
                }
                disablePadding
              >
                <ListItemText id={doneList.id}>{doneList.value}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </div>
  );
}
export default Lists;
