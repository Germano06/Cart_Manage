import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider, Fab } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import { Delete } from "@material-ui/icons";

export default function Cards(props) {
  const path = "http://127.0.0.1:8000";
  const [active, setActive] = useState(true);
  const [del, setDel] = useState(false);
  var url = "";

  const handleDelete = (e) => {
    const deletedItemId = e.currentTarget.id;
    console.log(deletedItemId);
    url = `http://127.0.0.1:8000/api/delete-cart/${deletedItemId}`;
    fetch(url, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setDel(!del);
    props.delState(deletedItemId);
  };

  const handleCart = (e) => {
    console.log(e.currentTarget.id);
    if (active) {
      url = `http://127.0.0.1:8000/api/add-cart/`;
      const formData = new FormData();
      formData.append("id", null);
      formData.append("uemail", sessionStorage.getItem("Uname"));
      formData.append("prod", e.currentTarget.id);
      fetch(url, { method: "POST", body: formData })
        .then((response) => response.json())
        .then((data) => console.log(data));
    } else {
      handleDelete(e);
    }
    setActive(!active);
  };

  return (
    <Card
      sx={{
        width: 345,
        margin: 2,
        border: "solid grey",
        alignSelf: "center",
        bgcolor: "rgba(100,230,240,0.6)",
      }}
    >
      <CardHeader title={props.title} subheader={props.subheader} />
      <CardMedia
        component="img"
        height="194"
        image={path + props.image}
        alt=""
        sx={{ objectFit: "contain", bgcolor: "rgb(255,255,255)" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.active ? "Available" : ""}
        </Typography>
        <Divider />
        {props.page === "Home" ? (
          <div style={{ display: "flex", justifyContent: "right" }}>
            <Fab
              id={props.ky}
              color={active ? "primary" : "secondary"}
              aria-label="add"
              size="medium"
              sx={{ margin: 1, marginTop: 2 }}
              onClick={handleCart}
            >
              <AddShoppingCart />
            </Fab>
            <Fab
              id={props.ky}
              size="medium"
              aria-label="like"
              sx={{
                margin: 1,
                marginTop: 2,
                color: "common.white",
                bgcolor: red[600],
                "&:hover": { bgcolor: red[700] },
              }}
              onClick={handleDelete}
            >
              <FavoriteIcon />
            </Fab>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Fab
              id={props.ky}
              size="medium"
              sx={{
                margin: 1,
                marginTop: 3,
                color: "common.white",
                bgcolor: red[600],
                "&:hover": { bgcolor: red[700] },
                alignContent: "center",
              }}
              onClick={handleDelete}
            >
              <Delete />
            </Fab>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
