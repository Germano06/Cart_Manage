import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Cart.css";
import ButtonAppBar from "../../Assets/ButtonAppBar";
import Cards from "../../Assets/Cards";
import del from "../../Assets/Cards";

const Cart = () => {
  const [aut, setAut] = useState(sessionStorage.getItem("Uname"));
  const [crt, setCrt] = useState([]);
  const [prod, setProd] = useState([]);
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

  // useEffect(() => {
  //   const fetchProd = async () => {
  //     crt.map(async function (ct) {
  //       try {
  //         url = `http://127.0.0.1:8000/api/get-product/${ct.prod}`;
  //         const response = await fetch(url);
  //         const data = await response.json();
  //         setProd(data);
  //       } catch (error) {
  //         console.error("Error fetching product data:", error);
  //       }
  //     });
  //   };
  //   fetchProd();
  // }, [crt]);

  const crtDeleted = (deletedItemId) => {
    console.log("Cart", deletedItemId);
    const updatedCart = crt.filter((item) => item.prod !== deletedItemId);
    console.log("UpCart", updatedCart);
    setCrt(updatedCart);
  };

  return (
    <div>
      <ButtonAppBar page="Cart" au={aut} />
      {console.log(crt)}
      <Box
        sx={{
          width: "auto",
          margin: "20px",
          marginTop: "90px",
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyItems: "flex-start",
        }}
      >
        {prod.map(function (ct, index) {
          console.log(ct);
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
      </Box>
    </div>
  );
};

export default Cart;
