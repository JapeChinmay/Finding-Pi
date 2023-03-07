import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./Table.css";

const TableData = () => {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://randomuser.me/api/?results=5");
      console.log(res.data.results);
      setUserData(res.data.results);
    };
    fetchData();
  }, []);

  const searchHandler = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const deleteuser = (id) => {
    let data = userData.filter((users) => {
      return users.login.uuid !== id;
    });
    setUserData(data);
  };
  return (
    <Fragment>
      <div className="search-container">
        <h1>Random User Search Table🔍</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Here"
            onChange={searchHandler}
          />
          <button>Search</button>
        </div>
      </div>

      <div className="container">
        <div className="table">
          <div className="row header">
            <div className="cell">Title</div>
            <div className="cell">Name</div>
            <div className="cell">Gender</div>
            <div className="cell">Location</div>
            <div className="cell">Email</div>
            <div className="cell">UUID</div>
            <div className="cell">delete</div>
          </div>

          {userData
            .filter((users) => {
              if (search === "") return users;
              else if (
                users.name.first.includes(search) ||
                users.name.last.includes(search) ||
                users.email.includes(search) ||
                users.location.city.includes(search) ||
                users.login.uuid.includes(search)
              ) {
                return users;
              }
            })
            .map((data, idx) => {
              return (
                <div key={idx} className="row">
                  <div className="cell">{data.name.title}</div>
                  <div className="cell">{`${data.name.first} ${data.name.last}`}</div>

                  <div className="cell">{data.gender}</div>
                  <div className="cell">{`${data.location.city}, ${data.location.country}`}</div>
                  <div className="cell">{data.email}</div>
                  <div className="cell">{data.login.uuid}</div>
                  <button
                    className=" delete"
                    onClick={() => deleteuser(data.login.uuid)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

export default TableData;
