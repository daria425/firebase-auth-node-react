import { useReducer, useContext } from "react";
import { formReducer } from "../reducers/formReducer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthProvider";
const initialState = {
  email: "",
  password: "",
};

export default function Signup() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { login, loginWithGoogle } = useContext(AuthContext);
  const nav = useNavigate();
  const handleInputChange = (e) => {
    dispatch({
      type: "USER_INPUT",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleLogin = async (e, provider) => {
    e.preventDefault();
    try {
      switch (provider) {
        case "email":
          await login(state.email, state.password);
          break;
        case "google":
          await loginWithGoogle();
          break;
      }
      nav("/app");
    } catch (err) {
      console.error("Signup error", err);
    }
  };
  return (
    <div className="auth">
      <h2>Login In</h2>
      <form
        className="auth__form"
        onSubmit={async (e) => {
          handleLogin(e, "email");
        }}
      >
        <label htmlFor="username" className="auth__input-label">
          Name:
        </label>
        <input
          required
          type="text"
          id="username"
          name="username"
          value={state.username}
          onChange={(e) => {
            handleInputChange(e);
          }}
          className="auth__input"
        ></input>
        <label htmlFor="password" className="auth__input-label">
          Password
        </label>
        <input
          required
          type="password"
          id="password"
          name="password"
          value={state.password}
          className="auth__input"
          onChange={(e) => {
            handleInputChange(e);
          }}
        ></input>
        <button className="auth__btn" type="submit">
          Login
        </button>
        <button
          className="auth__btn"
          type="button"
          onClick={(e) => {
            handleLogin(e, "google");
          }}
        >
          Login with Google
        </button>
      </form>
    </div>
  );
}
