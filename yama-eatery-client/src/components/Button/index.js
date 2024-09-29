import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  primary = false,
  outline = false,
  rounded = false,
  disabled = false,
  lefIcon,
  rightIcon,
  className,
  onClick,
  children,
  ...passProps
}) {
  let Component = "button";
  const props = {
    onClick,
    ...passProps,
  };

  // Remove event listener when button disabled

  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  const classes = cx("wrapper", {
    [className]: className,
    primary,
    outline,
    rounded,
    disabled,
  });

  if (to) {
    props.to = to;
    Component = Link;
  } else if (href) {
    props.href = href;
    Component = "a";
  }

  return (
      <Component className={classes} {...props}>
        {lefIcon && <span className={cx("icon")}>{lefIcon}</span>}
        <span className={cx("text")}>{children}</span>
        {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
      </Component>
  );
} 

export default Button;