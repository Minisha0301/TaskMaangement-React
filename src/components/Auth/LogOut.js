export const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};