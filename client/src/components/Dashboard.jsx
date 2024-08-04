import { useOutletContext } from "react-router-dom";
export default function Dashboard() {
  const { authenticatedUser } = useOutletContext();
  console.log(authenticatedUser);
  return <div>Welcome!</div>;
}
