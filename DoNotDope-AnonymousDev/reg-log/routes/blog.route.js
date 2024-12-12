const express = require("express");
const {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getMyBlogs,
  getSingleBlogs,
  updateBlog,
} = require("../controller/blog.controler.js");
const { isAdmin, isAuthenticated } = require("../jwt/Authtoken.js");

const router = express.Router();

router.post("/create", isAuthenticated, isAdmin("admin"), createBlog);
router.delete("/delete/:id", isAuthenticated, isAdmin("admin"), deleteBlog);
router.get("/all-blogs", getAllBlogs);
router.get("/single-blog/:id", isAuthenticated, getSingleBlogs);
router.get("/my-blog", isAuthenticated, isAdmin("admin"), getMyBlogs);
router.put("/update/:id", isAuthenticated, isAdmin("admin"), updateBlog);

module.exports = router;
