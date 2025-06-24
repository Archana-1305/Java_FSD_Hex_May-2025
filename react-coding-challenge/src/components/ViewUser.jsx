import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ViewUser() {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");

  // function fetch the users from the api
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        let response = await axios.get('https://gorest.co.in/public/v2/users',
          { headers: { 'Authorization': 'Bearer daa200d0face9beb71eba17fb3ff416bc87a5366c256005432aa06f888a84a9b' } }
        );
        //console.log(response)
        setUsers(response.data)  
      }
       catch (err) {
        console.log(err);
      }
    }
    getAllUsers(); 
  }, []);

  // function to delete user
  const onDelete = async (userId) => {
    try {
      await axios.delete(`https://gorest.co.in/public/v2/users/${userId}`,
        { headers: { 'Authorization': 'Bearer daa200d0face9beb71eba17fb3ff416bc87a5366c256005432aa06f888a84a9b' } }
      );

      let temp = users.filter(u => u.id !== userId);
      setUsers(temp);
      setMsg("User Deleted");
      
    } catch (err) {
      setMsg("Could not delete resource");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
           <br/><br/>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
             <div>
                <h1>User Details</h1>
                <Link className="btn btn-primary" to={"/add-user"}>Add User</Link>
            </div>

            {/* To display deleted message only when delete id triggered */}
            {  
                msg !== "" ? <div className="row">
                    <div className="col-lg-12">
                        {msg}
                    </div>
                </div> : ""
            }

            <div>
              <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">GENDER</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">EDIT</th>
                        <th scope="col">DELETE</th>
                    </tr>
                </thead>
                <tbody>
                  {users.map((u, index) => (
                    <tr key={u.id}>
                      <td>{index + 1}</td> {/** Displays the index value */}
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.gender}</td>
                      <td>{u.status}</td>
                      <td>
                        <Link className="btn btn-warning btn-sm" to={`/edit-user/${u.id}`}>Edit</Link> {/** Goes to Edit Page */}
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => onDelete(u.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewUser;