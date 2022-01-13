import { useEffect, useRef, useState } from "react";
import Button from "../../UIElements/Button";
import classes from "./ImageUpload.module.css";

const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid; // cause of useState batching

    if (event.target.files && event.target.files.length !== 0) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(pickedFile);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={classes["form-control"]}>
      <input
        id={props.id}
        type="file"
        style={{ display: "none" }}
        accept=".jpg, .jpeg, .png"
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div className={classes[`image-upload ${props.center && "center"}`]}>
        <div className={classes["image-upload__preview"]}>
          {!previewUrl && <p>Please pick an image</p>}
          {previewUrl && <img src={previewUrl} alt="Preview"></img>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
