import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhoneVolume,
  faEnvelope,
  faClock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const cl = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cl("wrapper")}>
      <div className={cl("container")}>
        <div className={cl("content")}>
          <div className={cl("content-block-logo")}>
            <div className={cl("information")}>
              <div className={cl("content-block-logo-script")}>
                <h2>Information</h2>
              </div>
              <div className={cl("content-block-logo-info")}>
                <div className={cl("info")}>
                  <div className={cl("info-icon")}>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <p>
                    <span>Address:</span> 5171 W Campbell Ave
                  </p>
                </div>
                <div className={cl("info")}>
                  <div className={cl("info-icon")}>
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <p>
                    <span>Phone:</span> (+91) - 540-025-124553
                  </p>
                </div>
                <div className={cl("info")}>
                  <div className={cl("info-icon")}>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <p>
                    <span>Email:</span> sale@Nest.com
                  </p>
                </div>
                <div className={cl("info")}>
                  <div className={cl("info-icon")}>
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <p>
                    <span>Hours:</span> 10:00 - 18:00, Mon - Sat
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={cl("content-navigation")}>
            <div className={cl("content-navigation-block")}>
              <div className={cl("content-navigation-script")}>
                <div className={cl("title")}>Chính sách</div>
                <div className={cl("link")}>
                  <ul>
                    <li>Điều khoản chung</li>
                    <li>Chính sánh hợp tác</li>
                    <li>Chính sách đổi trả</li>
                    <li>Chính sách thanh toán</li>
                    <li>Chính sách bảo mật</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={cl("content-navigation-block")}>
              <div className={cl("content-navigation-script")}>
                <div className={cl("title")}>Đối tác</div>
                <div className={cl("link")}>
                  <ul>
                    <li>Abavina.com</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={cl("content-navigation-block")}>
              <div className={cl("content-navigation-script")}>
                <div className={cl("title")}>Hổ trợ</div>
                <div className={cl("link")}>
                  <ul>
                    <li>Hỗ trợ khách hàng</li>
                    <li>Hướng dẫn hợp tác</li>
                    <li>Hướng dẫn mua hàng</li>
                    <li>hướng dẫn thanh toán</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={cl("content-navigation-block")}>
              <div className={cl("content-navigation-script")}>
                <div className={cl("title")}>Thông tin khác</div>
                <div className={cl("link")}>
                  <ul>
                    <li>Tuyển dụng nhân sự</li>
                    <li>Liên hệ hợp tác</li>
                    <li>Blog tin tức</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cl("container-bottom")}>
          <div className={cl("copyright")}>
            <p>
              © 2022, <span>E-Food</span> - Copyright by E-Food store All rights reserved
            </p>
          </div>
          <div className={cl("phone")}>
            <div className={cl("phone-script")}>
              <div className={cl("icon")}>
                <FontAwesomeIcon icon={faPhoneVolume} />
              </div>
              <div className={cl("phone-info")}>
                <div className={cl("phone-number")}>
                  <p>1900 - 6666</p>
                </div>
                <div className={cl("work-calendar")}>
                  <p>Working 8:00 - 22:00</p>
                </div>
              </div>
            </div>
            <div className={cl("phone-script")}>
              <div className={cl("icon")}>
                <FontAwesomeIcon icon={faPhoneVolume} />
              </div>
              <div className={cl("phone-info")}>
                <div className={cl("phone-number")}>
                  <p>1900 - 8888</p>
                </div>
                <div className={cl("work-calendar")}>
                  <p>24/7 Support Center</p>
                </div>
              </div>
            </div>
          </div>
          <div className={cl("subcribe")}>
            <div className={cl("follow-us")}>
              <div className={cl("title")}>
                <p>Follow Us</p>
              </div>
              <div className={cl("all-icon")}>
                <div className={cl("icon")}>
                  <FontAwesomeIcon icon={faFacebookF} />
                </div>
                <div className={cl("icon")}>
                  <FontAwesomeIcon icon={faTwitter} />
                </div>
                <div className={cl("icon")}>
                  <FontAwesomeIcon icon={faInstagram} />
                </div>
                <div className={cl("icon")}>
                  <FontAwesomeIcon icon={faTiktok} />
                </div>
                <div className={cl("icon")}>
                  <FontAwesomeIcon icon={faYoutube} />
                </div>
              </div>
            </div>
            <div className={cl("subcribe-script")}>
              <p>Up to 15% discount on your first subcribe</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;