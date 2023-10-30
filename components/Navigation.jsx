import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Navigation = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  const handleSignout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/signin");
  };
  return (
    <nav
      className="navbar fixed-top navbar-expand-lg"
      style={{ backgroundColor: "#630163" }}
    >
      <div className="container">
        <Link className="navbar-brand" href="/" legacyBehavior>
          <a className="text-decoration-none text-white">GetConnected</a>
        </Link>
        <button
          className="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {session && (
              <li className="nav-item px-2">
                <Link href="/profile" legacyBehavior>
                  <a
                    className={
                      router.pathname == "/profile"
                        ? "nav-link active"
                        : "nav-link text-white"
                    }
                  >
                    Profile
                  </a>
                </Link>
              </li>
            )}
            {session?.user.isAdmin == true ? (
              <>
                <li className="nav-item px-2">
                  <Link className="nav-link" href="/users" legacyBehavior>
                    <a
                      className={
                        router.pathname == "/users"
                          ? "nav-link active"
                          : "nav-link text-white"
                      }
                    >
                      Users
                    </a>
                  </Link>
                </li>
                <li className="nav-item px-2">
                  <Link className="nav-link" href="/recipes" legacyBehavior>
                    <a
                      className={
                        router.pathname == "/recipes"
                          ? "nav-link active"
                          : "nav-link text-white"
                      }
                    >
                      Recipes
                    </a>
                  </Link>
                </li>
                <li className="nav-item px-2">
                  <Link className="nav-link" href="/restaurants" legacyBehavior>
                    <a
                      className={
                        router.pathname == "/restaurants"
                          ? "nav-link active"
                          : "nav-link text-white"
                      }
                    >
                      Restaurants
                    </a>
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
          <ul className="navbar-nav me-2 mb-2 mb-lg-0">
            {session ? (
              <>
                <li className="nav-item px-2">
                  <Link className="nav-link" href="/users" legacyBehavior>
                    <span className="nav-link" style={{color:"#ccc"}}>
                      signed in as {session.user.email}
                    </span>
                  </Link>
                </li>
                <li class="nav-item">
                  <button className="btn btn-danger" onClick={handleSignout}>
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <li class="nav-item">
                <Link href="/auth/signin" legacyBehavior>
                  <a
                    className={
                      router.pathname == "/auth/signin"
                        ? "nav-link text-white active"
                        : "nav-link text-white"
                    }
                    aria-current="page"
                    href="#"
                  >
                    Sign in
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
