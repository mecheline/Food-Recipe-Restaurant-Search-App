import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const pjs = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <SessionProvider session={session}>
      <div className={pjs.className}>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          pauseOnVisibilityChange
          closeOnClick
          pauseOnHover
          theme="colored"
        />
      </div>
    </SessionProvider>
  );
}
