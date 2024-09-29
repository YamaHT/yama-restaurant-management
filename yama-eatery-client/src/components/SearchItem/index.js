import classNames from "classnames/bind";
import styles from "./SearchItem.module.scss";

const cx = classNames.bind(styles);

function Searchitem({ to, data }) {
  const classes = cx("wrapper", {});

  return <div className={classes}>test</div>;
}

export default Searchitem;