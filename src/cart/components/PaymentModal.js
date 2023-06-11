import React, { useState } from "react";
import BasicModal from "../../shared/UIElements/BasicModal";
import classes from "./PaymentModal.module.css";
import { Button, TextField } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCalendar,
  faCreditCard,
  faCreditCardAlt,
} from "@fortawesome/free-regular-svg-icons";

const PaymentModal = (props) => {
  const submitHandler = () => {};
  const [visaClass, setVisaClass] = useState("method-active");
  const [otherClass, setOtherClass] = useState("method");

  const setAllPassive = () => {
    setVisaClass("method");
    setOtherClass("method");
  };

  return (
    <BasicModal open={props.open} handleClose={props.onClose}>
      {/* <div className={classes[""]}></div> */}

      <div className={classes["form"]}>
        <div className={classes["methods"]}>
          <div
            onClick={() => {
              setAllPassive();
              setVisaClass("method-active");
            }}
            className={classes[`${visaClass}`]}
          >
            <img src="https://i.imgur.com/sB4jftM.png" width="80"></img>
          </div>
          <div
            onClick={() => {
              setAllPassive();
              setOtherClass("method-active");
            }}
            className={classes[`${otherClass}`]}
          >
            Другой способ
          </div>
        </div>
      </div>

      <div className={classes["form-content"]}>
        {/* <div className={classes["form-content"]}></div> */}
        <div className={classes["title"]}>Кредитная карта</div>
        <TextField
          className={classes["name"]}
          label="Владелец карты"
          variant="outlined"
          //   inputRef={}
        />
        <div className={classes["name-icon"]}>
          <FontAwesomeIcon icon={faAddressCard} />
        </div>

        <TextField
          className={classes["number"]}
          label=" Номер карты"
          variant="outlined"
          //   inputRef={}
        />
        <div className={classes["number-icon"]}>
          <FontAwesomeIcon icon={faCreditCard} />
        </div>

        <TextField
          className={classes["date"]}
          label="Срок"
          variant="outlined"
          //   inputRef={}
        />

        <div className={classes["date-icon"]}>
          <FontAwesomeIcon icon={faCalendar} />
        </div>

        <TextField
          className={classes["cvv"]}
          label="CVV"
          variant="outlined"
          //   inputRef={}
        />
        <div className={classes["cvv-icon"]}>
          <FontAwesomeIcon icon={faCreditCardAlt} />
        </div>

        <Button
          className={classes["submit-button"]}
          onClick={submitHandler}
          type={"submit"}
          variant="outlined"
        >
          Оплатить
        </Button>
      </div>
    </BasicModal>
  );
};

export default PaymentModal;
