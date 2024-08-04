import { useReducer, useContext } from "react";
import { formReducer } from "../reducers/formReducer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthProvider";
const initialState = {
  username: "",
  email: "",
  password: "",
};

export default function Auth() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { signup } = useContext(AuthContext);
  const nav = useNavigate();
  const handleInputChange = (e) => {
    dispatch({
      type: "USER_INPUT",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(state.email, state.password, state.username);
      nav("/app");
    } catch (err) {
      console.error("Signup error", err);
    }
  };
  return (
    <div className="login">
      <h2>Create account</h2>
      <form
        className="login__form"
        onSubmit={async (e) => {
          handleSignUp(e);
        }}
      >
        <label htmlFor="username" className="login__input-label">
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
          className="login__input"
        ></input>
        <label htmlFor="email" className="login__input-label">
          Email
        </label>
        <input
          required
          type="text"
          id="email"
          name="email"
          className="login__input"
          value={state.email}
          onChange={(e) => {
            handleInputChange(e);
          }}
        ></input>
        <label htmlFor="password" className="login__input-label">
          Password
        </label>
        <input
          required
          type="password"
          id="password"
          name="password"
          value={state.password}
          className="login__input"
          onChange={(e) => {
            handleInputChange(e);
          }}
        ></input>
        <button className="btn" type="submit">
          Create account
        </button>
      </form>
    </div>
  );
}
