import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Cards(props) {
  const image = "";

  return (
    <Card sx={{ maxWidth: 345, margin: 5, border: "solid grey", alignSelf: "center" }}>
      <CardHeader title={props.title} subheader={props.subheader} />
      <CardMedia component="img" height="194" image={props.image} alt="" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.active ? "Available" : "Unavailable"}
        </Typography>
      </CardContent>
    </Card>
  );
}
