import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminList() {
  const [admins, setAdmins] = useState([]);
  // const [username, setUsername] = useState(""); // Uncomment if needed
//   const navigate = useNavigate();

  useEffect(() => {
    listAdmins();
  }, []);

  const listAdmins = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get("http://localhost:7000/admin/adminlist");
      setAdmins(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  
  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this admin user?");
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:7000/admin/admindelete/${id}`);
        listAdmins();
        window.alert('Deleted ac succesfully')
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <title>Table with Image, Name, Address, Number, and Actions</title>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        table {\n            width: 100%;\n            border-collapse: collapse;\n        }\n\n        th, td {\n            border: 1px solid black;\n            padding: 8px;\n            text-align: left;\n        }\n\n        .action-buttons {\n            display: flex;\n            gap: 10px;\n        }\n\n        .action-buttons button {\n            cursor: pointer;\n        }\n    ",
        }}
      />
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Address</th>
            <th>email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((add) => (
            <tr key={add._id}>
              <td>
                <img
                  src={`http://localhost:7000/upload/${add.image}`}
                  alt="photo"
                  style={{ width: 50, height: 50 }}
                />
              </td>
              <td>{add.name}</td>
              <td>{add.address}</td>
              <td>{add.email}</td>
              <td className="action-buttons">
                <button>
                <Link to={`/adminedit/${add._id}`}>
                      Edit
                 </Link>
                </button>
                <button onClick={() => handleDelete(add._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminList;
