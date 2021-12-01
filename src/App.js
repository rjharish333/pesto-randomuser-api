import React, { useState, useEffect } from "react";
import './App.css';
import ConfigData from './config/ConfigData';

const App = () => {

  const [loader, setLoader] = useState(true);
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState([]);

  useEffect(() => {

    fetch(ConfigData.API_URL)
      .then(res => res.json())
      .then(
        (result) => {

          setUser(result.results[0])
          setLoader(false)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setLoader(false)
          setError(error)
        }
      )

 }, [reload]);

  return (
    <>
    {
      loader && <h5 className="text-center">loading...</h5>
    }
    {
      !loader && error.length > 0 && <div>Error: {error.message}</div>
    }
    {
      !loader && user &&
    <>
    <input id="slider" className="customSlider" type="checkbox" />
    <label htmlFor="slider"></label>
    <div className="wrapper">
        <div className="top-icons">
            <i className="fas fa-long-arrow-alt-left"></i>
            <i className="fas fa-ellipsis-v"></i>
            <i className="far fa-heart"></i>
        </div>

        <div className="profile user">
            <img alt="user-profile" src={user.picture.large} className="thumbnail" />
            <div className="check"><i className="fas fa-check"></i></div>
            <h3 className="name">{ user.name.title + " " + user.name.first + " " + user.name.last}</h3>
            <p className="title">{ user.email}</p>
            <p className="description"><b>Address:</b> { user.location.street.number },
            { user.location.street.name }, { user.location.city }, { user.location.state }
            , { user.location.country } - { user.location.postcode }
            </p>
            <p className="description">
              <b>Timezone:</b> { user.location.timezone.description }
            </p>
            <p className="description">
              <i className="fas fa-mobile"></i> {user.phone}, {user.cell  }
            </p>
            <button type="button" onClick={() => setReload(!reload)} className="btn"><i className="fas fa-redo"></i></button>
        </div>

        <div className="user-info-icons">
            <div className="icon">
                <button className="border-none"><i className="fas fa-mars"></i></button>
                <h4>{user.gender}</h4>
                <p>Gender</p>
            </div>

            <div className="icon">
                <button className="border-none"><i className="fas fa-birthday-cake"></i></button>
                <h4>{user.dob.age}</h4>
                <p>Age</p>
            </div>

            <div className="icon">
                <button className="border-none"><i className="far fa-calendar-alt"></i></button>
                <h4> {user.registered.date.substr(0, 10)} </h4>
                <p>Register At</p>
            </div>

        </div>
    </div>
    </>
    }
    </>
  );
}

export default App;
