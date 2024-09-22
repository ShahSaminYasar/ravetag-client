import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/Title/Title";
import Container from "../../layouts/Container/Container";

const AdminLogin = () => {
  const navigate = useNavigate();

  return (
    <Container className="min-h-screen w-full grid place-content-center bg-white">
      <form
        onSubmit={(e) => {
          event.preventDefault();
          if (
            e.target.username.value === import.meta.env.VITE_ADMIN_USERNAME &&
            e.target.password.value === import.meta.env.VITE_ADMIN_PASSWORD
          ) {
            sessionStorage.setItem(
              "admin_token",
              JSON.stringify(import.meta.env.VITE_ADMIN_TOKEN)
            );
            return navigate("/admin");
          } else {
            return alert("Incorrect username or password!");
          }
        }}
        className="flex flex-col gap-3 w-full max-w-80 p-4 shadow-md bg-white text-slate-800 font-normal text-md"
      >
        <Title>Admin Login</Title>
        <input
          name="username"
          placeholder="Username"
          type="text"
          required
          className="input input-bordered"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          required
          className="input input-bordered"
        />
        <button
          type="submit"
          className="btn w-full bg-red-600 text-white hover:bg-red-800"
        >
          Login
        </button>
      </form>
      <span className="block text-center py-3 px-2 text-slate-700 text-md font-normal">
        Go to{" "}
        <Link className="text-red-600 font-medium" to="/">
          Home
        </Link>
      </span>
    </Container>
  );
};
export default AdminLogin;
