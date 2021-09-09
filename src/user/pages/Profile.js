import { useSelector } from "react-redux";
import classes from "./Profile.module.css";

const Profile = () => {
  const user = useSelector((state) => state.ui.user);

  return (
    <div>
      <h4>login: {user.login}</h4>
      <h4>password: {user.password}</h4>
    </div>
  );
};

export default Profile;
