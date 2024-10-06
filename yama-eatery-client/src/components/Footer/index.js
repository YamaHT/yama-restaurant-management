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
              <img src="Food-Logo.png" alt="logo"/>
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
                    <span>Email:</span> sale@eFood.com
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
                <div className={cl("title")}>Store Policy</div>
                <div className={cl("link")}>
                  <ul>
                    <li>General terms</li>
                    <li>Cooperation policy</li>
                    <li>Refund policy</li>
                    <li>Payment policy</li>
                    <li>Privacy policy</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={cl("content-navigation-block")}>
              <div className={cl("content-navigation-script")}>
                <div className={cl("title")}>Partnership</div>
                <div className={cl("link")}>
                  <ul>
                    <li>Abavina.com</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={cl("content-navigation-block")}>
              <div className={cl("content-navigation-script")}>
                <div className={cl("title")}>Support Center</div>
                <div className={cl("link")}>
                  <ul>
                    <li>Online support</li>
                    <li>Membership instructions</li>
                    <li>Ordering instructions</li>
                    <li>Payment instructions</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={cl("content-navigation-block")}>
              <div className={cl("content-navigation-script")}>
                <div className={cl("title")}>Contact Us</div>
                <div className={cl("link")}>
                  <ul>
                    <li>Recruitment</li>
                    <li>Contact for cooperation</li>
                    <li>Other information</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cl("container-bottom")}>
          <div className={cl("copyright")}>
            <p>
              © 2022, <span>eFood</span> - Copyright by E-Food store All rights reserved
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