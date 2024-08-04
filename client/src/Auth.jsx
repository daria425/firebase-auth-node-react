import { useReducer } from "react";
import { formReducer } from "./reducers/formReducer";
const initialState = {
  username: "",
  email: "",
  password: "",
};

export default function Auth() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  function handleInputChange(e) {
    dispatch({
      type: "USER_INPUT",
      field: e.target.name,
      payload: e.target.value,
    });
  }
  function checkState(e, state) {
    e.preventDefault();
    console.log(state);
  }
  return (
    <div className="login">
      <h2>Create account</h2>
      <form
        className="login__form"
        onSubmit={(e) => {
          checkState(e, state);
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
          type="text"
          id="email"
          name="email"
          className="login__input"
          onChange={(e) => {
            handleInputChange(e);
          }}
        ></input>
        <label htmlFor="password" className="login__input-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
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
