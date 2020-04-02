import React from "react";

const Header = ({ user, setUser }) => {
  return (
    <div>
      Welcome, {user}
      <button onClick={() => setUser("")}>Log out</button>
    </div>
  );
};

export default Header;
