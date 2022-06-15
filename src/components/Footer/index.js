import { gitHub, linkedIn, gmail } from 'assets';

export const Footer = () => {
  return (
    <footer>
      <div className="social-links">
        <a className="social-links__icon" href="https://github.com/TylerJoseph27">
          <img src={gitHub} alt="GitHub Icon" />
        </a>
        <a className="social-links__icon" href="https://www.linkedin.com/in/tyler-carvalho-481425223/">
          <img src={linkedIn} alt="LinkedIn Icon" />
        </a>
        <a className="social-links__icon" href="mailto:tjcarvalho27@gmail.com">
          <img src={gmail} alt="Gmail Icon" />
        </a>
      </div>
      <div className="footer__text">
        <div className="resources">
          <p>
            Gmail icon created by <a href="https://www.flaticon.com/authors/driss-lebbat">
            Driss Lebbat</a> - Flaticon
          </p>
          <p>
            GitHub and LinkedIn icons created by <a href="https://www.flaticon.com/authors/iconsbox">
            IconsBox</a> - Flaticon
          </p>
          <p>
            Memory Game pictures created by <a href="https://cainos.itch.io/">
            Cainos</a> - itch.io
          </p>
          <p>
            Turn-Based Game pictures created by <a href="https://clembod.itch.io/">
              Clembod
            </a>, <a href="https://oco.itch.io/">
              OcO
            </a>, and <a href="https://edermunizz.itch.io/">
              edermunizz
            </a> - itch.io
          </p>
        </div>
        <p>&copy; 2022 Tyler Carvalho</p>
      </div>
    </footer>
  );
}
