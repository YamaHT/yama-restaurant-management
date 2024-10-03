import Header from "@/components/Header";
import Footer from "@/components/Footer";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss"
import { Box } from "@mui/material";

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <Box maxWidth={"xl"}>{children}</Box>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;