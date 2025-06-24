import axios from "axios";
import { useState } from "react";

function AddUser() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [gender, setGender] = useState("");
  let [status, setStatus] = useState("");
  let [msg, setMsg] = useState("");

  let postUser = async () => {
    try {
      await axios.post( "https://gorest.co.in/public/v2/users",
        {
          name: name,
          email: email,
          gender: gender,
          status: status,
        },
        { headers: {'Authorization':  "Bearer daa200d0face9beb71eba17fb3ff416bc87a5366c256005432aa06f888a84a9b",  }, }
      );
      setMsg("User added successfully!");
      
    } catch (err) {
      setMsg("Operation Failed");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 500 }}>
      <div className="row">
        <div className="col-md-12">
          <div className="card mt-4">
            <div className="card-header">Enter User Details</div>
            <div className="card-body">

              {msg !== "" && (
                <div className="mb-4">
                  <div className="alert alert-primary">{msg}</div>
                </div>
              )}

              <div className="mb-3">
                <label>Name</label>
                <input onChange={(e) => setName(e.target.value)} className="form-control" type="text" required />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" required />
              </div>

              <div className="mb-3">
                <label>Gender</label>
                <select className="form-control" onChange={(e) => setGender(e.target.value)} required >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Status</label>
                <select className="form-control" onChange={(e) => setStatus(e.target.value)} required >
                  <option value="">Select</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="mb-3">
                <button className="btn btn-primary" onClick={postUser}> Add User </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddUser;