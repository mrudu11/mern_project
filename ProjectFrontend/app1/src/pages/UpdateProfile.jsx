import React, { useEffect, useState } from "react";

function UpdateProfile() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  // Load existing data
  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    const storedMobile = sessionStorage.getItem("mobile");

    if (storedName) setName(storedName);
    if (storedMobile) setMobile(storedMobile);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim()) {
      setMessage("Name is required");
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      setMessage("Mobile number must be 10 digits");
      return;
    }

    // Save updated values
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("mobile", mobile);

    setMessage("Profile updated successfully ✅");
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h4>Update Profile</h4>
        </div>

        <div className="card-body">
          {message && (
            <div className="alert alert-info">{message}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* NAME */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* MOBILE */}
            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
