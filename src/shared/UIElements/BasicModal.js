import React from "react";
import { Backdrop, Box, Fade, Modal, styled } from "@material-ui/core";
import classes from "./BasicModal.module.css";

const screenWidth = window.innerWidth;
let width = undefined;
let padding = 3;

if (screenWidth < 700) {
  width = screenWidth - screenWidth / 3;
} else if (screenWidth < 500) {
  width = screenWidth - screenWidth / 10;
  padding = 1;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: width,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 10,
  boxShadow: 24,
  p: padding,
  outline: "none",
};

export default function BasicModal(props) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={props.style ? props.style : style}>{props.children}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
