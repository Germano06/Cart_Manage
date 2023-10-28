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
  const aut = sessionStorage.getItem("Uname");
  const adm = sessionStorage.getItem("admin");
  var url = "";

  const handleDelete = async (e) => {
    const deletedItemId = e.currentTarget.id;
    if (adm) {
      url = `http://127.0.0.1:8000/api/delete-product/${deletedItemId}`;
    } else {
      url = `http://127.0.0.1:8000/api/delete-cart/${deletedItemId}`;
    }
    const response = await fetch(url, { method: "DELETE" });
    const data = await response.json();
    console.log(data);
    if (props.page === "Cart" || adm) {
      props.delState(deletedItemId);
    }
  };

  const handleCart = (e) => {
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
        minWidth: 300,
        margin: 2,
        border: "solid teal",
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
        sx={{
          objectFit: "contain",
          bgcolor: "rgb(255,255,255)",
          borderTop: "solid teal",
          borderBottom: "solid teal",
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.active ? "Available" : "Unavailable"}
        </Typography>
        <Divider />
        {props.page === "Home" && aut ? (
          <div style={{ display: "flex", justifyContent: "right" }}>
            <Fab
              id={props.ky}
              color={active ? "primary" : "secondary"}
              aria-label="add"
              size="medium"
              sx={{ margin: 1, marginTop: 2 }}
              disabled={sessionStorage.getItem("Uname") ? false : true}
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
