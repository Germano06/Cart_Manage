import React, { useState } from "react";
import "./LoginSignup.css";
import { Box, Button, TextField } from "@mui/material";
import ButtonAppBar from "../../Assets/ButtonAppBar";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const [action, setAction] = useState("Login");
  const [aut, setAut] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });
  const navigate = useNavigate();

  function signUp() {
    var url = "";
    var fl = false;
    const logIn = async () => {
      try {
        url = `http://127.0.0.1:8000/api/get-admin/${formValue.email}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Admin", data);
        if (data !== "NULL") {
          fl = true;
        } else throw "Not Admin";
      } catch (error) {
        console.log(error);
      }
      if (!fl) {
        try {
          url = `http://127.0.0.1:8000/api/get-user/${formValue.email}`;
          const response = await fetch(url);
          const data = await response.json();
          console.log("User", data);
          if (data !== "NULL") {
            fl = true;
          } else {
            throw "not user";
          }
        } catch (error) {
          console.log(error);
        }
        if (fl) {
          sessionStorage.setItem("Uname", formValue.email);
          if (sessionStorage.getItem("Uname") !== "") {
            setAut(true);
            setAction("Sign Up");
          }
        } else alert("try again!");
      } else {
        sessionStorage.setItem("admin", formValue.email);
      }
      navigate("/home");
    };

    if (action === "Sign Up") {
      url = "http://127.0.0.1:8000/api/create-user/";
      const formData = new FormData();
      formData.append("id", null);
      formData.append("name", formValue.name);
      formData.append("email", formValue.email);
      formData.append("password", formValue.password);
      formData.append("contact", formValue.contact);
      fetch(url, { method: "POST", body: formData })
        .then((response) => response.json())
        .then((data) => console.log("data", data));
      console.log(formValue);
      alert(action);
      setAction("Login");
    } else {
      logIn();
    }
  }

  return (
    <div>
      <ButtonAppBar page={action} au={aut} />
      <center>
        <Box
          component="form"
          sx={{
            padding: 3,
            margin: 10,
            width: 350,
            height: 550,
            backgroundColor: "lightblue",
          }}
        >
          <h1>{action}</h1>
          {action === "Login" ? (
            <div></div>
          ) : (
            <TextField
              required
              id="name"
              label="Name"
              type="text"
              variant="filled"
              style={{ margin: 20 }}
              onChange={(e) =>
                setFormValue((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          )}

          <TextField
            required
            id="email"
            label="Email"
            type="email"
            variant="filled"
            style={{ margin: 20 }}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            variant="filled"
            style={{ margin: 20 }}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          {action === "Login" ? (
            <div />
          ) : (
            <TextField
              id="contact"
              label="Contact"
              type="text"
              variant="filled"
              style={{ margin: 20 }}
              onChange={(e) =>
                setFormValue((prev) => ({ ...prev, contact: e.target.value }))
              }
            />
          )}

          <Button variant="contained" onClick={signUp} style={{ margin: 20 }}>
            {action}
          </Button>

          {action === "Login" ? (
            <a href="#">
              <h6
                style={{ alignSelf: "flex-start", marginTop: 20 }}
                onClick={() => setAction("Sign Up")}
              >
                <u>
                  Already Registered? <b>Signup</b>
                </u>
              </h6>
            </a>
          ) : (
            <div />
          )}
        </Box>
      </center>
    </div>
  );
}
