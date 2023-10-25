import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../backend";

const Home = () => {
  const [data, setdata] = useState();
  const history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const id = JSON.parse(localStorage.getItem("user"))._id;

      try {
        axios.post(`${API}/medicin/getmedicins`, { id }).then((response) => {
          if (response.data.success) {
            console.log("medicins", response.data.med);
            setdata(response.data.med);
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    } else {
      history("/signin");
    }
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {data?.length > 0 ? (
          data.map((item, i) => {
            return (
              <div
                key={i}
                class="card text-bg mb-3 my-3 mx-2"
                style={{
                  width: `calc(33.33% - 10px)` /* Set width to 1/3 of the container width with some spacing */,
                  marginBottom: `10px` /* Add spacing between rows */,
                  padding: `10px`,
                  boxSizing: `border-box`,
                }}
              >
                <div class="card-header">
                  {item?.name}
                  <br />
                  {item.email}
                </div>
                <div class="card-body">
                  {item?.medicin.map((item, i) => {
                    return (
                      <div key={i}>
                        <h5 class="card-title">{item?.name}</h5>
                        <p class="card-text">
                          <b>Dosage :</b>
                          {item?.dosage}
                          <br />
                          <b>Days:</b>
                          {item?.days ? item.days : "Everyday"}
                        </p>

                        <hr></hr>
                      </div>
                    );
                  })}
                </div>
                <div class="card-footer text-body-secondary">
                  <b>Added hello :</b> {item.createdAt.split("T")[0]}
                </div>
              </div>
            );
          })
        ) : (
          <h1>nothing is added</h1>
        )}
      </div>
      <div
        class="d-grid gap-2 col-6 mx-auto"
        style={{
          position: "fixed",
          bottom: "20px", // Adjust the distance from the bottom as needed
          left: "50%", // Center horizontally
          transform: "translateX(-50%)", // Center horizontally
        }}
      >
        <Link class="btn btn-primary" type="button" to="/createeditmedicin/id">
          Add Medicin
        </Link>
      </div>
    </>
  );
};

export default Home;
