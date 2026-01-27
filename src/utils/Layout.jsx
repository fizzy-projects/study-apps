import { Link, Outlet } from "react-router-dom";

function Layout( {includeHeader=false} ) {
  return (
    <div>
      
      {includeHeader && 
        <div>
            <header style={{ padding: "1rem" }}>
            <nav style={{color:"purple"}}>
              <Link to="/">Home</Link> |{" "}
              <Link to="/login">Admin</Link> |{" "}
            </nav>
          </header>
      </div>
      }
      
      <Outlet/>
    </div>

  );
}

export default Layout;
