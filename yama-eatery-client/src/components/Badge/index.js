import classNames from "classnames/bind";
import style from "./Badge.module.scss"
import React from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function Badge({
    to,
    badgeColor,
    content,
    icon,
    iconColor,
    textColor,
    onClick,
    disabled = false,
    large = false,
    medium = false,
    small = false,
    ...passProps
}) {

    const container = cx("wrapper", {
        large,
        medium,
        small,
        disabled,
    });

    const iconStyles = cx("icon", {
        [iconColor]: iconColor
    })

    const badgeStyle = cx("badgeStyle", {
        [badgeColor]: badgeColor,
        [textColor]: textColor
    })

   // Start region test statement
    const isNumber = !isNaN(content) && !isNaN(parseInt(content));
    if (!isNumber) {
        content = "0";
    }

    if (content.length > 2 && isNumber) {
        content = "99+";
    }
    //End region test stament

    const props = {
        onClick,
        to,
        ...passProps,
    };

    return (
        <Link className={container} {...props} >
            <div className={iconStyles}>{icon}</div>
            <span className={badgeStyle}>{content}</span>
        </Link>
    )
}
export default Badge;