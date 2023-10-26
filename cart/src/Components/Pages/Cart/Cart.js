import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Cart.css";
import ButtonAppBar from "../../Assets/ButtonAppBar";
import Cards from "../../Assets/Cards";

const Cart = () => {
  const [aut, setAut] = useState(sessionStorage.getItem("Uname"));
  const [prod, setProd] = useState([]); 
  var url = "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // url = `http://127.0.0.1:8000/api/get-cart/${aut}`;
        url = `http://127.0.0.1:8000/api/get-products/`;
        const response = await fetch(url);
        const data = await response.json();
        setProd(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [aut]);

  return (
    <div>
      <ButtonAppBar page="Cart" au={aut} />
      {console.log(prod)}
      <Box
        sx={{
          width: "auto",
          margin: "20px",
          marginTop: "90px",
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {prod.map(function (pro, index) {
          return <Cards key={index} title={pro.title} subheader={pro.description} image={pro.img} active={pro.active}></Cards>
        })}
      </Box>
    </div>
  );
};

export default Cart;
