import {
  AppBar,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
} from "@material-ui/core";
import { Fab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext } from "react";
import Context from "../context/context";
import classes from "./header.module.css";

function Header() {
  let textInput = React.createRef();
  const contexts = useContext(Context);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (textInput.current.value === "") {
      return null;
    }
    contexts.addData(textInput.current.value);
    contexts.getdata();
    textInput.current.value = "";
  };

  const theme = useTheme();
  return (
    <div style={{}}>
      <AppBar position="sticky">
        <Toolbar
          style={{
            backgroundColor: "white",
          }}
        >
          <logo style={{ backgroundColor: theme.palette.primary.main }}>
            &#x2714;
          </logo>
          <div
            className={classes.logoText}
            style={{ color: theme.palette.primary.main }}
          >
            TODO
          </div>
          <div className={classes.inputDiv}>
            <form onSubmit={onFormSubmit}>
              <input
                className={classes.input}
                ref={textInput}
                type="text"
                placeholder="Add a Note..."
              />
              <Fab
                style={{ transform: "scale(0.75) translate(-60px, -3px)" }}
                color="primary"
                size="small"
                aria-label="add"
                onClick={onFormSubmit}
              >
                <AddIcon />
              </Fab>
            </form>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
