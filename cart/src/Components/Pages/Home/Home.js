import React, { useEffect, useState } from "react";
import ButtonAppBar from "../../Assets/ButtonAppBar";
import Cards from "../../Assets/Cards";
import { Box } from "@mui/material";

const Home = () => {
  const aut = sessionStorage.getItem("Uname");
  const adm = sessionStorage.getItem("admin");
  const [prod, setProd] = useState([]);
  const [del, setDel] = useState();
  var url = "";

  if (adm) {
    url = `http://127.0.0.1:8000/api/get-all-products/`;
  } else {
    url = `http://127.0.0.1:8000/api/get-products/`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setProd(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [aut, del]);

  const crtDeleted = (deletedItemId) => {
    setDel(deletedItemId);
  };

  return (
    <div>
      <ButtonAppBar page="Home" au={aut} />
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
          {adm ? <h1>All Products</h1> : <h1>E-Shopping</h1>}
          {console.log(aut, adm)}
        </center>
        <hr />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center space-between",
            width: "auto",
          }}
        >
          {prod.map(function (pro, index) {
            return (
              <Cards
                key={index}
                title={pro.title}
                subheader={pro.description}
                image={pro.img}
                active={pro.active}
                ky={pro.id}
                page="Home"
                delState={crtDeleted}
              />
            );
          })}
        </div>
      </Box>
    </div>
  );
};

export default Home;
