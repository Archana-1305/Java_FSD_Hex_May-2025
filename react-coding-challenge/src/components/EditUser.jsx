import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditUser() {
    // Getting user id using params
    const params = useParams();
   
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");

    // function to fetch user details 
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                let response = await axios.get( 'https://gorest.co.in/public/v2/users/' + params.id,
                    { headers: {'Authorization': 'Bearer daa200d0face9beb71eba17fb3ff416bc87a5366c256005432aa06f888a84a9b'}}
                );
                {/** To show the existing details */}
                setName(response.data.name);
                setEmail(response.data.email);
                setGender(response.data.gender);
                setStatus(response.data.status);
            } catch (err) {
                setMsg("Data not available");
            }
        }
        getUserDetails();
    }, []);

    // functiion to update user details
    const updateUser = async () => {
        try {
            await axios.put('https://gorest.co.in/public/v2/users/' + params.id,
                {
                    name: name,
                    email: email,
                    gender: gender,
                    status: status
                },
                {headers: {'Authorization': 'Bearer daa200d0face9beb71eba17fb3ff416bc87a5366c256005432aa06f888a84a9b', }}
            );
            setMsg("User updated successfully!");
        } catch (err) {
            setMsg("Failed to update user.");
        }
    }

    return (
        <div className="container" style={{ maxWidth: 500 }}>
            <h1>Edit User</h1>

            {msg !== "" && (
                <div className="mb-4">
                  <div className="alert alert-primary">{msg}</div>
                </div>
              )}

            <div className="mb-3">
                <label>Name</label>
                <input onChange={e => setName(e.target.value)} className="form-control" required/>
            </div>

            <div className="mb-3">
                <label>Email</label>
                <input onChange={e => setEmail(e.target.value)} className="form-control" required type="email" />
            </div>
            
            <div className="mb-3">
                <label>Gender</label>
                <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    className="form-control"
                    required
                >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className="mb-3">
                <label>Status</label>
                <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    className="form-control"
                    required
                >
                    <option value="">Select</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <button className="btn btn-primary" onClick={updateUser}>
                Update User
            </button>
        </div>
    );
}

export default EditUser;