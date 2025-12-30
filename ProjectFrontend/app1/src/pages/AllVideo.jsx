import React, { useEffect, useState } from "react";

import Navbar from "../component/Navbar";
import {
  getAllVideos,
  getVideosByCourse,
  addVideo,
  updateVideo,
  deleteVideo,
  getAllCourses,
} from "../services/videoService";

import Swal from "sweetalert2";

export default function AllVideos() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("ALL");
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState(null);

  //  Modal form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course_id: "",
    youtube_url: "",
    added_at: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({});

  /* ================= LOAD COURSES ================= */
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getAllCourses();

      console.log("COURSES RESPONSE:", res);

      if (res?.status === "success" && Array.isArray(res.data)) {
        setCourses(res.data);
      } else {
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);
  /* ================= LOAD VIDEOS ================= */
  const fetchVideos = async () => {
    const res =
      selectedCourse === "ALL"
        ? await getAllVideos()
        : await getVideosByCourse(selectedCourse);

    if (res.status === "success") setVideos(res.data);
    else setVideos([]);
  };

  useEffect(() => {
    fetchVideos();
  }, [selectedCourse]);
  /* ================= FORM HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error message as user types/selects
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleEditClick = (video) => {
    setIsEditMode(true);
    setEditingVideoId(video.video_id);

    setFormData({
      title: video.title,
      description: video.description,
      course_id: video.course_id,
      youtube_url: video.youtube_url,
      added_at: video.added_at.split("T")[0],
    });

    setErrors({});
    setShowModal(true); //  OPEN MODAL
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };
  /* ================= VALIDATION ================= */
  const validate = () => {
    let temp = {};
    if (!formData.title.trim()) temp.title = "Title is required";
    if (!formData.description.trim())
      temp.description = "Description is required";
    if (!formData.course_id) temp.course_id = "Course is required";
    if (!formData.youtube_url.trim())
      temp.youtube_url = "Youtube URL is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!validate()) return;

    const res = isEditMode
      ? await updateVideo(editingVideoId, formData)
      : await addVideo(formData);

    if (res.status === "success") {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: isEditMode
          ? "Video updated successfully"
          : "Video added successfully",
      }).then(() => {
        closeModal();
        fetchVideos();
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Operation failed",
      }).then(() => {
        closeModal();
        fetchVideos();
      });
    }
  };
  const handleDeleteClick = (video) => {
    Swal.fire({
      title: "Are you sure?",
      html: `<strong>Video Title:</strong> ${video.title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteVideo(video.video_id);

        if (res.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Video deleted successfully",
          }).then(() => {
            fetchVideos(); // refresh table
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete video",
          }).then(() => {
            fetchVideos(); // refresh table
          });
        }
      } else {
        //  No / Close clicked → just refresh
        fetchVideos();
      }
    });
  };

  const closeModalAndRefresh = () => {
    document.getElementById("closeModalBtn").click();
    resetForm();
    fetchVideos();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      course_id: "",
      youtube_url: "",
      added_at: new Date().toISOString().split("T")[0],
    });

    setErrors({});
    setIsEditMode(false);
    setEditingVideoId(null);
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid mt-4 px-4">
        <h2 className="text-center mb-4">All Videos</h2>

        {/* Filter + Add Video */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
          <div className="d-flex flex-column" style={{ minWidth: "200px" }}>
            <label className="fw-bold mb-1">Filter by Course</label>

            <select
              className="form-select"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="ALL">All Courses</option>

              {courses.length > 0 ? (
                courses.map((course) => (
                  <option key={course.course_id} value={course.course_id}>
                    {course.course_name}
                  </option>
                ))
              ) : (
                <option disabled>No courses available</option>
              )}
            </select>
          </div>

          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            style={{
              minWidth: "180px",
              height: "42px",
              whiteSpace: "nowrap",
            }}
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <i className="bi bi-plus-circle me-2"></i>Add New Video
          </button>
        </div>

        {/* TABLE */}
        <div className="table-responsive shadow rounded">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Course</th>
                <th>Title</th>
                <th>Description</th>
                <th>Youtube</th>
                <th>Added At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center fw-bold text-muted">
                    No videos available
                  </td>
                </tr>
              ) : (
                videos.map((v) => (
                  <tr key={v.video_id}>
                    <td>{v.video_id}</td>
                    <td>{v.course_name}</td>
                    <td>{v.title}</td>
                    <td>{v.description}</td>
                    <td>
                      <a href={v.youtube_url} target="_blank" rel="noreferrer">
                        Open
                      </a>
                    </td>
                    <td>{new Date(v.added_at).toLocaleDateString()}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEditClick(v)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteClick(v)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {/* ================= ADD VIDEO MODAL ================= */}

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content rounded-3 shadow">
              {/* ===== Header ===== */}
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-semibold">
                  {isEditMode ? "Edit Video Details" : "Add New Video"}
                </h5>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeModal}
                ></button>
              </div>

              {/* ===== Body ===== */}
              <div className="modal-body px-4 py-3">
                {/* Course */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Course</label>
                  <select
                    className={`form-select ${
                      errors.course_id ? "is-invalid" : ""
                    }`}
                    name="course_id"
                    value={formData.course_id}
                    onChange={handleChange}
                  >
                    <option value="">Select a course</option>
                    {courses.map((c) => (
                      <option key={c.course_id} value={c.course_id}>
                        {c.course_name}
                      </option>
                    ))}
                  </select>
                  {errors.course_id && (
                    <div className="invalid-feedback">{errors.course_id}</div>
                  )}
                </div>

                {/* Title */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Video Title</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    name="title"
                    placeholder="Enter video title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                </div>

                {/* Youtube URL */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">YouTube URL</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.youtube_url ? "is-invalid" : ""
                    }`}
                    name="youtube_url"
                    placeholder="Enter YouTube URL"
                    value={formData.youtube_url}
                    onChange={handleChange}
                  />
                  {errors.youtube_url && (
                    <div className="invalid-feedback">{errors.youtube_url}</div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    rows="3"
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    name="description"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                {/* Added At */}
                <div className="mb-2">
                  <label className="form-label fw-semibold">Added At</label>
                  <input
                    type="date"
                    className="form-control bg-light"
                    value={formData.added_at}
                    disabled
                  />
                </div>
              </div>

              {/* ===== Footer ===== */}
              <div className="modal-footer px-4">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary px-4"
                  onClick={handleSubmit}
                >
                  {isEditMode ? "Update Video" : "Add Video"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
