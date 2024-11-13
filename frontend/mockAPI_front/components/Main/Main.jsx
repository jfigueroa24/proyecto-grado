import UserContext from "../Auth/UserContext"
import PropTypes from "prop-types";

function Main({ children }) {
  return <UserContext>{children}</UserContext>;
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
