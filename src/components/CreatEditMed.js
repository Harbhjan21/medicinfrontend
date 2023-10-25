import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../backend";

const CreatEditMed = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [everyday, seteveryday] = useState(false);
  const [days, setdays] = useState();
  const [medlist, setmedlist] = useState();

  const [medicin, setmedicin] = useState({
    name: "",
    email: "",
    // medicin: [
    //   {
    //     name: "",
    //     dosage: "",
    //     everyday: false,
    //     days: [],
    //   },
    // ],
  });

  const [medicindetail, setmedicindetail] = useState({
    name: "",
    dosage: "",
  });

  useEffect(() => {
    const fetch = async () => {
      if (id !== "id") {
        // const response = await axios.post(
        //   `${API}/blogs/getBlog`,
        //   {
        //     id,
        //   },
        //   {
        //     headers: {
        //       token,
        //     },
        //   }
        // );
        // if (response.data.success) {
        //   settitle(response.data.blog.title);
        //   setdescreption(response.data.blog.descreption);
        //   setcontent(response.data.blog.content);
        // }
      }
    };
    fetch();
  }, []);
  useEffect(() => {
    console.log("in useeffect");
    setmedlist(medicin.medicin);
  }, [medicin?.medicin]);

  const handleChange = (e) => {
    setmedicin({
      ...medicin,
      [e.target.name]: e.target.value,
    });
    console.log("in handle change");
  };
  const handleMedicinChange = (e) => {
    setmedicindetail({
      ...medicindetail,
      [e.target.name]: e.target.value,
    });
  };

  const addmedicin = () => {
    setmedicin({
      ...medicin,
      medicin:
        medicin?.medicin?.length > 0
          ? [...medicin?.medicin, medicindetail]
          : [medicindetail],
    });
    setmedicindetail({});
    seteveryday(true);
    document.getElementById("everyday").checked = true;
    setmedicindetail({
      everyday: true,
    });
    setdays([]);

    console.log("check in add medicin", medicin);
  };

  const handledays = (e) => {
    console.log("days check ", e.target.value, e.target.checked);
    if (e.target.checked) {
      setdays(days ? [...days, e.target.value] : [e.target.value]);
      setmedicindetail({
        ...medicindetail,
        days: days?.length > 0 ? [...days, e.target.value] : [e.target.value],
      });
    } else {
      const i = days.indexOf(e.target.value);
      days.splice(i, 1);
      setmedicindetail({ ...medicindetail, days });
    }
  };

  const handlesubmit = () => {
    const id = JSON.parse(localStorage.getItem("user"))._id;

    try {
      axios
        .post(`${API}/medicin/add`, { medicin, id })
        .then((response) => {
          console.log("response", response.data);
          if (response.data.success) {
            history("/home");
          } else {
            alert("try again!");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          border: "2px solid black",
          width: 400,
        }}
      >
        <h2>{id == "id" ? "ADD MEDICIN" : "  EDIT MEDICIN"}</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginTop: 10 }}>
            <label>Name: </label>
            <input
              type="text"
              value={medicin.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <label>EMAIL: </label>
            <input
              type="email"
              value={medicin.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div style={{ marginLeft: 50, width: 150, marginTop: 10 }}>
            {medlist?.length > 0 &&
              medlist.map((item, index) => {
                return (
                  <div
                    key={index}
                    class="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          {item.name}
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">{item.dosage}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div>
            <div>
              <label>Medicin: </label>
              <input
                type="text"
                name="name"
                onChange={handleMedicinChange}
                required
              />
            </div>
            <div>
              <label>Dosage: </label>
              <input
                type="text"
                name="dosage"
                onChange={handleMedicinChange}
                required
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",

                marginTop: 10,
              }}
            >
              <div>
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  name="everyday"
                  id="everyday"
                  value={everyday}
                  onChange={(e) => {
                    seteveryday(!everyday);

                    console.log("everyday", e.target.value);
                    setmedicindetail({
                      ...medicindetail,
                      everyday: !everyday,
                    });
                  }}
                />
                <label class="form-check-label" for="flexSwitchCheckChecked">
                  Everyday
                </label>
              </div>

              {!everyday && (
                <div style={{ marginTop: 5 }}>
                  <div className="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value={1}
                      onChange={handledays}
                    />
                    <label className="form-check-label" for="inlineCheckbox1">
                      Mon
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value={2}
                      onChange={handledays}
                    />
                    <label class="form-check-label" for="inlineCheckbox2">
                      Tus
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value={3}
                      onChange={handledays}
                    />
                    <label class="form-check-label" for="inlineCheckbox2">
                      Wed
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value={4}
                      onChange={handledays}
                    />
                    <label class="form-check-label" for="inlineCheckbox2">
                      Thu
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value={5}
                      onChange={handledays}
                    />
                    <label class="form-check-label" for="inlineCheckbox2">
                      Fri
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value={6}
                      onChange={handledays}
                    />
                    <label class="form-check-label" for="inlineCheckbox2">
                      Sat
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value={0}
                      onChange={handledays}
                    />
                    <label class="form-check-label" for="inlineCheckbox2">
                      Sun
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button
              type="button"
              name="medicin"
              onClick={addmedicin}
              class="btn btn-outline-primary"
            >
              ADD
            </button>

            <button
              type="button"
              onClick={handlesubmit}
              class="btn btn-outline-success"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatEditMed;
