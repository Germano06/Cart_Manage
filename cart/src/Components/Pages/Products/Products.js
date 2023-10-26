import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { useState, useEffect } from "react";
import ButtonAppBar from "../../Assets/ButtonAppBar";

const Products = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    img: "",
    active: false,
  });

  useEffect(() => {
    if (formValue.img) {
      console.log(formValue);
      var url = "http://127.0.0.1:8000/api/create-product/";
      const formData = new FormData();
      formData.append("id", null);
      formData.append("img", formValue.img);
      formData.append("title", formValue.title);
      formData.append("description", formValue.description);
      formData.append("active", formValue.active);
      fetch(url, { method: "POST", body: formData })
        .then((response) => response.json())
        .then((data) => console.log("data", data));
    }
  }, [formValue.img, formValue]);

  function handleChange(e) {
    console.log(e.target.files[0]);
    setFormValue((prev) => ({ ...prev, img: e.target.files[0] }));
  }

  return (
    <div>
      <ButtonAppBar page={"Products"} au={true} />
      <center>
        <Box
          component="form"
          sx={{
            padding: 3,
            margin: 10,
            width: 400,
            height: 600,
            backgroundColor: "lightblue",
          }}
        >
          <h1>Products</h1>
          <TextField
            id="title"
            label="Title"
            variant="standard"
            margin="dense"
            sx={{ margin: 3 }}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <TextField
            id="description"
            label="Description"
            variant="standard"
            margin="dense"
            sx={{ margin: 3 }}
            multiline
            onChange={(e) =>
              setFormValue((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <FormControlLabel
            control={<Switch />}
            label="Available"
            sx={{ margin: 3 }}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, active: e.target.checked }))
            }
          />
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ width: 190, alignSelf: "center", margin: 3 }}
            type="submit"
          >
            Upload Image
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </Button>
        </Box>
      </center>
    </div>
  );
};

export default Products;
