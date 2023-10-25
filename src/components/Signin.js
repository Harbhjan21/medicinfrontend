import React, { useEffect, useState } from "react";
import { API } from "../backend";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const history = useNavigate();
  const [loder, setloder] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setloder(true);
    axios
      .post(`${API}/auth/signin`, user)
      .then((response) => {
        console.log("response in signin", response.data);
        if (response.data.success) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          history("/home");
        } else {
          alert(response.data.error);
          setloder(false);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setloder(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      history("/home");
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {loder ? (
        <div class="spinner-border my-3" role="status">
          <span class="sr-only"></span>
        </div>
      ) : (
        <div>
          <h2>SIGN IN</h2>
          <form
            onSubmit={handleSubmit}
            style={{ border: "2px solid black", padding: 10 }}
          >
            <div style={{ marginBottom: 10 }}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                maxLength={8}
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;
