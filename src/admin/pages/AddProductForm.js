import { Button, Card, TextField } from "@material-ui/core";
import { useRef } from "react";
import classes from "./AddProductForm.module.css";

const AddProductForm = () => {
  const nameRef = useRef("");
  const firmRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef("");
  const sizeRef = useRef("");
  const quantityRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");

    //   dispatch(
    //     uiActions.login({
    //       user: {
    //         login: loginRef.current.value,
    //         password: passwordRef.current.value,
    //       },
    //     })
    //   );
  };

  return (
    <Card>
      <form className={classes.form}>
        <TextField
          className={classes["name-input"]}
          label="Name"
          variant="outlined"
          inputRef={nameRef}
        />
        <TextField
          className={classes["firm-input"]}
          label="Firm"
          variant="outlined"
          inputRef={firmRef}
        />
        <TextField
          className={classes["description-input"]}
          label="Description"
          variant="outlined"
          inputRef={descriptionRef}
        />
        <TextField
          className={classes["price-input"]}
          label="Price"
          variant="outlined"
          inputRef={priceRef}
        />
        <TextField
          className={classes["size-input"]}
          label="Size"
          variant="outlined"
          inputRef={sizeRef}
        />
        <TextField
          className={classes["quantity-input"]}
          label="Quantity"
          variant="outlined"
          inputRef={quantityRef}
        />
        <Button
          className={classes["submit-button"]}
          onClick={submitHandler}
          type={"submit"}
          variant="outlined"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default AddProductForm;
