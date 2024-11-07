import "../styles/globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <header>
        <FontAwesomeIcon icon={faRobot} />
        <h1>Study Buddy</h1>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
