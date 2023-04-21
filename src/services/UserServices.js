import axios from "./axios";
const fetchBlog = () => {
  return axios.get(`/blog`);
};
const FetchDetailBlog = (detailId) => {
  return axios.get(`/blog/detail/${detailId}`);
};
const submitForm = (data) => {
  return axios.post(`/register`, data);
};
const submitLogin = (data) => {
  return axios.post(`/login`, data);
};
const PostNewComment = (
  idBlog,
  idUser,
  idComment,
  newComment,
  imageUser,
  nameUser,
  config
) => {
  const formData = new FormData();
  formData.append("id_blog", idBlog);
  formData.append("id_user", idUser);
  formData.append("id_comment", idComment);
  formData.append("comment", newComment);
  formData.append("image_user", imageUser);
  formData.append("name_user", nameUser);

  return axios.post(`/blog/comment/${idBlog}`, formData, config);
};
const ratingApi = (idUser, idBlog, rate, config) => {
  const formData = new FormData();
  formData.append("user_id", idUser);
  formData.append("blog_id", idBlog);
  formData.append("rate", rate);
  return axios.post(`/blog/rate/${idBlog}`, formData, config);
};
const getRatingApi = (idBlog) => {
  return axios.get(`/blog/rate/${idBlog}`);
};
const UpdateUser = (id, data, config) => {
  return axios.post(`/user/update/${id}`, data, config);
};
const getCategoryBrand = () => {
  return axios.get(`/category-brand`);
};
const addProduct = (inputs, config) => {
  const formData = new FormData();
  formData.append("name", inputs.name);
  formData.append("price", inputs.price);
  formData.append("category", inputs.category);
  formData.append("brand", inputs.brand);
  formData.append("company", inputs.company);
  formData.append("detail", inputs.detail);
  formData.append("status", inputs.status);
  formData.append("sale", inputs.sale);

  Object.keys(inputs.avatar).map((item, i) => {
    formData.append("file[]", inputs.avatar[item]);
  });

  return axios.post(`/user/product/add`, formData, config);
};
export {
  fetchBlog,
  FetchDetailBlog,
  submitForm,
  submitLogin,
  PostNewComment,
  ratingApi,
  getRatingApi,
  UpdateUser,
  addProduct,
  getCategoryBrand,
};
