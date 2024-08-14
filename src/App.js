// App.js
import React, { useState } from "react";
import SecondTodoApp from "./Components/SecondTodoApp";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

function App() {
  const [user, setUser] = useState(null);
  const [isAccount, setIsAccount] = useState(false);

  const handleSignUp = (user) => {
    setUser(user);
  };

  const handleSignIn = (user) => {
    setUser(user);
  };

  return (
    <div className="App">
      {user ? (
        <SecondTodoApp user={user} />
      ) : (
        <>
          {isAccount ? (
            <SignUp onSignUp={handleSignUp} />
          ) : (
            <SignIn onSignIn={handleSignIn} setIsAccount={setIsAccount} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
