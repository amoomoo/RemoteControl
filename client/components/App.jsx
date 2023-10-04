import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes, // use Routes instead of Switch
  Route,
  Navigate,
} from 'react-router-dom';
import LoginSignup from './LoginSignup.jsx';
import UserPage from './UserPage.jsx';
import SearchPage from './SearchPage.jsx'; // import the SearchPage

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(''); // renamed from username to userEmail

  return (
    <Router>
      <Routes>
        <Route
          path='/login-signup'
          element={
            !isLoggedIn ? (
              <LoginSignup
                onLogin={() => setIsLoggedIn(true)}
                setUser={(email) => setUserEmail(email)} // renamed setUsername to setUserEmail
              />
            ) : (
              <Navigate to='/user' replace />
            )
          }
        />
        <Route
          path='/user'
          element={
            isLoggedIn ? (
              <UserPage email={userEmail} /> // changed prop from username to email
            ) : (
              <Navigate to='/login-signup' replace />
            )
          }
        />
        {/* add the route for SearchPage */}
        <Route path='/search' element={<SearchPage />} />
        <Route path='*' element={<Navigate to='/login-signup' replace />} />
      </Routes>
    </Router>
  );
};

export default App;

