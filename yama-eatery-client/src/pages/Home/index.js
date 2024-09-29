import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles)

function HomePage() {
    return <div className={cx("wrapper")}>
        <div>hello world</div>
    </div>;
}

export default HomePage;