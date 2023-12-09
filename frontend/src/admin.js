
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [invalid, setInvalid] = useState("");
  const navigate = useNavigate();


  const hansleSignup = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!name) {
      validationErrors.name = "Name is required";
    }
    if (!email) {
      validationErrors.email = "Email is required";
    }
    if (!password) {
      validationErrors.password = "Password is required";
    }
    if (!address) {
      validationErrors.address = "address is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors);
      setInvalid(validationErrors);
      return;
    }
    const data = {
      name: name,
      email: email,
      password: password,
      image: image,
      address: address,
    };
    console.log("Sending data:", data);
    try {
      const response = await axios.post(
        "http://localhost:7000/admin/createadmin",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API response:", response.data);
      setInvalid({});
      // window.location.href = "/adminlist";
      navigate('/adminlist');
    } catch (err) {
      console.log("API error:", err);
    }
  };
  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  return (
    <div className="App">
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user" />
                <input
                  type="text"
                  className="login__input"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {invalid.name && (
                  <p className="errors">{invalid.name}</p>
                )}
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user" />
                <input
                  type="text"
                  className="login__input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {invalid.email && (
                  <p className="errors">{invalid.email}</p>
                )}
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock" />
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {invalid.password && (
                  <p className="errors">{invalid.password}</p>
                )}
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock" />
                <input
                  type="type"
                  className="login__input"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {invalid.address && (
                  <p className="errors">{invalid.address}</p>
                )}
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock" />
                <input
                  type="file"
                  className="login__input"
                  placeholder="image"
                  onChange={handleImage}
                  accept="image/*"
                />
              </div>
              <button className="button login__submit" onClick={hansleSignup}>
                <span className="button__text">Log In Now</span>
                <i className="button__icon fas fa-chevron-right" />
              </button>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4" />
            <span className="screen__background__shape screen__background__shape3" />
            <span className="screen__background__shape screen__background__shape2" />
            <span className="screen__background__shape screen__background__shape1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
