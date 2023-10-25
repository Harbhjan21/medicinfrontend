import React, { useEffect, useState } from "react";

import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [login, setlogin] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setlogin(true);
    }
  }, []);

  return (
    <div>
      <nav
        class="navbar navbar-expand-lg sticky-top"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <b>Medicin_Rem</b>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="home">
                  Home
                </Link>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div style={{ marginLeft: 10 }}>
                {login ? (
                  <div class="dropdown">
                    <a
                      class="btn btn-secondary dropdown-toggle"
                      style={{
                        height: 40,
                        width: 40,
                        backgroundImage: `url(https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png)`,
                        backgroundSize: "cover",
                        cursor: "pointer",
                      }}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></a>

                    <ul
                      class="dropdown-menu"
                      style={{
                        position: "absolute",
                        left: -100,
                      }}
                    >
                      <li>
                        <div
                          onClick={() => {
                            localStorage.removeItem("user");
                            // dispatch({ type: "LOGOUT" });
                            setlogin(false);
                            history("/signin");
                          }}
                        >
                          <a class="dropdown-item" href="#">
                            Logout
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <Link to="signin" class="btn btn-outline-primary">
                      SignIn
                    </Link>
                    <Link to="signup" class="btn btn-outline-secondary my-1">
                      SignUp
                    </Link>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
