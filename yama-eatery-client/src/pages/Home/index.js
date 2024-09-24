import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import { Button } from "@mui/material";

const cx = classNames.bind(styles)

function HomePage() {
    return <div className={cx("wrapper")}>
        <Button variant="outlined" disabled>Click me</Button>
    </div>;
}

export default HomePage;