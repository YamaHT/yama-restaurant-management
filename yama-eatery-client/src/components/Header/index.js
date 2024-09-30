import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import {
  faArrowRightFromBracket,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import Cart from "@/components/Cart";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("contents")}>
          <div className={cx("logo-header")}>
            <img src="Food-Logo.png" alt="logo" />
          </div>
          <div className={cx("search-bar-header")}>
            <SearchBar
              placeholder="Search food..."
              spellCheck={false}
              rounded
              className={cx("search-bar-success")}
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            >
              Search
            </SearchBar>
          </div>
          <div className={cx("action-header")}>
            <Cart />
            <Button
              to="/"
              outline
              rounded
              className={cx("btn-outline-success")}
              rightIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;