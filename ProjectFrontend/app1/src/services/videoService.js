import axios from "axios";

const BASE_URL = "http://localhost:5000/vdo";

// helper (MATCHES auth.js)
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");

  return {
    token: token, //  THIS IS THE KEY
  };
};

//  Get ALL videos
export const getAllVideos = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/videos-with-course-name`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (error) {
    console.log("AXIOS ERROR:", error.response?.data || error.message);
    return { status: "error", error: "Failed to fetch videos" };
  }
};

// Get videos by course
export const getVideosByCourse = async (courseId) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/videos-with-course-name?course_id=${courseId}`,
      { headers: getAuthHeaders() }
    );
    return res.data;
  } catch (error) {
    console.log("AXIOS ERROR:", error.response?.data || error.message);
    return { status: "error", error: "Failed to fetch videos" };
  }
};

//  Add video
export const addVideo = async (videoData) => {
  const res = await axios.post(BASE_URL, videoData, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

//  Update video
export const updateVideo = async (id, videoData) => {
  const res = await axios.put(`${BASE_URL}/${id}`, videoData, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

//  Delete video
export const deleteVideo = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

//get course

const API_URL = "http://localhost:5000/vdo/courses-active";

export const getAllCourses = async () => {
  try {
    const token = sessionStorage.getItem("token");

    console.log("TOKEN FROM STORAGE:", token); // debug

    const res = await axios.get(API_URL, {
      headers: {
        token: token, //
      },
    });

    return res.data;
  } catch (error) {
    console.log("AXIOS ERROR:", error.response?.data || error.message);
    return { status: "error", data: [] };
  }
};
