import { Box, Button, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Cart.css";
import ButtonAppBar from "../../Assets/ButtonAppBar";
import Cards from "../../Assets/Cards";
import { purple, teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: purple,
  },
});

const Cart = () => {
  const aut = sessionStorage.getItem("Uname");
  const [crt, setCrt] = useState([]);
  const [prod, setProd] = useState([]);
  const [del, setDel] = useState();
  var prodName = [];
  var count = 0;
  var url = `http://127.0.0.1:8000/api/get-cart/${aut}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCrt(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [aut, del]);

  useEffect(() => {
    const fetchProdPromises = crt.map(async function (ct) {
      const response = await fetch(
        `http://127.0.0.1:8000/api/get-product/${ct.prod}`
      );
      return await response.json();
    });

    Promise.all(fetchProdPromises)
      .then((data) => {
        setProd(data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [crt]);

  const crtDeleted = (deletedItemId) => {
    setDel(deletedItemId);
    console.log(del);
  };

  const handleDelete = () => {
    const fetchPromises = prod.map(async function (pr) {
      prodName.push(pr.title);
      count = count + 1;
      url = `http://127.0.0.1:8000/api/delete-cart/${pr.id}`;
      const response = await fetch(url, { method: "DELETE" });
      return await response.json();
    });
    Promise.all(fetchPromises).then((data) => {
      console.log(data, prodName.join(" | "), count);
      setDel(data);
      const formData = new FormData();
      formData.append("id", null);
      formData.append("uemail", aut);
      formData.append("productsbought", prodName.join(" | "));
      formData.append("totalorders", count);
      console.log(formData);
      fetch("http://127.0.0.1:8000/api/add-prodlog/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      alert("Checkout Successful!!");
    });
  };

  return (
    <div>
      <ButtonAppBar page="Cart" au={aut} />
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
        <center>
          <h1>My Cart</h1>
          <hr />
          {prod.length ? (
            <div />
          ) : (
            <h4>
              <i>Your cart is empty!!</i>
            </h4>
          )}
        </center>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center space-between",
            width: "auto",
          }}
        >
          {prod.map(function (ct, index) {
            return (
              <Cards
                key={index}
                title={prod[index] ? prod[index].title : ""}
                subheader={prod[index] ? prod[index].description : ""}
                image={prod[index] ? prod[index].img : ""}
                active={prod[index] ? prod[index].active : false}
                ky={prod[index] ? prod[index].id : ""}
                page="Cart"
                delState={crtDeleted}
              />
            );
          })}
        </div>
        {prod.length ? (
          <ThemeProvider theme={theme}>
            <center>
              <Button variant="contained" onClick={handleDelete}>
                Confirm Order
              </Button>
            </center>
          </ThemeProvider>
        ) : (
          <div />
        )}
      </Box>
    </div>
  );
};

export default Cart;
