import classes from "./Footer.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const cartTotalCount = useSelector((state) => state.cart.totalCount);
  const token = useSelector((state) => state.ui.user.token);

  return (
    <div className={classes["footer"]}>
      <div className={classes["top-content"]}>
        <div className={classes["flex-box"]}>
          <div className={classes["help"]}>
            <Link className={classes["title"]}>Help</Link>
            <Link className={classes["top-content-link"]}>Order status</Link>
            <Link className={classes["top-content-link"]}>Shipment</Link>
            <Link className={classes["top-content-link"]}>Return</Link>
            <Link className={classes["top-content-link"]}>Pay Methods</Link>
            <Link className={classes["top-content-link"]}>Contact us</Link>
          </div>
        </div>
        <div className={classes["flex-box"]}>
          <div className={classes["about"]}>
            <Link className={classes["title"]}>About Us</Link>
            <Link className={classes["top-content-link"]}>News</Link>
            <Link className={classes["top-content-link"]}>Career</Link>
            <Link className={classes["top-content-link"]}>Info</Link>
            <Link className={classes["top-content-link"]}>Investors</Link>
          </div>
        </div>
      </div>
      <div className={classes["bottom-content"]}>
        <div className={classes["location"]}>
          <svg height="12px" width="12px" fill="white" viewBox="0 0 42 58">
            <path d="M21 0C9.4 0 0 9.5 0 21.2 0 39.9 21 58 21 58s21-18.1 21-36.8C42 9.5 32.6 0 21 0zm0 31c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z"></path>
          </svg>
          <h4>Russia, Moscow.</h4>
          {/* <h4>E-shop inc., No rights reserved.</h4> */}
        </div>
        <div className={classes["socials"]}>
          <Link className={classes["bottom-content-link"]}>Insta</Link>
          <Link className={classes["bottom-content-link"]}>Vk</Link>
          <Link className={classes["bottom-content-link"]}>WhatsApp</Link>
        </div>
        <div className={classes["info"]}>
          <Link className={classes["bottom-content-link"]}>Catalogue</Link>
          <Link className={classes["bottom-content-link"]}>Rules of use</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
