import { useEffect } from "react";

const AdminPage = () => {
  useEffect(() => {
    // Redirect to the admin page
    window.location.href = "http://localhost:8000/admin/";
  }, []);

  return <div>Redirecting...</div>;
};

export default AdminPage;
