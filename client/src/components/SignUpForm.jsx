import { useReducer, useContext } from "react";
import { formReducer } from "../reducers/formReducer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthProvider";
const initialState = {
  username: "",
  email: "",
  password: "",
};

export default function SignupForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { signup, signupWithGoogle } = useContext(AuthContext);
  const nav = useNavigate();
  const handleInputChange = (e) => {
    dispatch({
      type: "USER_INPUT",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleSignUp = async (e, provider) => {
    e.preventDefault();
    try {
      switch (provider) {
        case "email":
          await signup(state.email, state.password, state.username);
          break;
        case "google":
          await signupWithGoogle();
          break;
      }
      nav("/app");
    } catch (err) {
      console.error("Signup error", err);
    }
  };
  return (
    <div className="auth">
      <h2>Create account</h2>
      <form
        className="auth__form"
        onSubmit={async (e) => {
          handleSignUp(e, "email");
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
        <label htmlFor="email" className="auth__input-label">
          Email
        </label>
        <input
          required
          type="text"
          id="email"
          name="email"
          className="auth__input"
          value={state.email}
          onChange={(e) => {
            handleInputChange(e);
          }}
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
          Create account
        </button>
        <button
          className="auth__btn--google"
          onClick={(e) => {
            handleSignUp(e, "google");
          }}
          type="button"
        >
          Sign Up with Google
        </button>
      </form>
    </div>
  );
}
