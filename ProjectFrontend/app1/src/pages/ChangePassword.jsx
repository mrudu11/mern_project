import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { changePassword } from "../services/studentServices"
import { toast } from "react-toastify"
import { loginContext } from "../App"

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()
  const { setloginStatus } = useContext(loginContext)

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (!token) {
      toast.warn("Please login first")
      navigate("/login")
    }
  }, [navigate])

  const handleChangePassword = async (e) => {
    e.preventDefault()

    if (!newPassword || !confirmPassword)
      return toast.warn("All fields required")

    if (newPassword !== confirmPassword)
      return toast.warn("Passwords do not match")

    try {
      const result = await changePassword(newPassword)

      if (result?.message) {
        toast.success(result.message)
        setloginStatus(true)
        navigate("/home")
      } else {
        toast.error(result?.error || "Failed to change password")
      }
    } catch (err) {
      toast.error("Server error")
    }
  }

  return (
    <div className="container w-50">
      <h1 className="text-center mt-3">Change Password</h1>

      <form onSubmit={handleChangePassword}>
        <label>New Password</label>
        <input
          type="password"
          className="form-control mb-3"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          className="form-control mb-3"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-success w-100">
          Confirm
        </button>
      </form>
    </div>
  )
}
