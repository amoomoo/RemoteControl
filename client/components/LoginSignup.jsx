import React from 'react';
import { useNavigate } from 'react-router-dom';
import { googleSignIn } from './Firebase.js';

const LoginSignup = ({ onLogin, setUser }) => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault(); // this will prevent the div from submitting
    const { name, email } = await googleSignIn();
    await fetch('/api/oauthSignup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, displayName: name }),
    });
    
    setUser(email);
    onLogin();
    navigate('/user');
  };

  return (
<div
  className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center object-fill"
  style={{'backgroundImage': `url('https://img.freepik.com/free-vector/gradient-abstract-blurred-grainy-background_1188-710.jpg')`, height: '100%'}}>
  <div
    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
    style={{'backgroundColor': 'rgba(0, 0, 0, 0.1)'}}>
    <div className="flex h-full items-center justify-center">
      <div className="text-white">
        <h1 className="font-primary text-8xl text-white" style={{'textShadow': '5px 5px 20px black'}}>VIBE</h1>
        <h4 className="mb-6 text-xl font-semibold" style={{'textShadow': '5px 5px 20px black'}}>The world's most popular meeting app</h4>
        <button className="font-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={(e) => handleGoogleSignIn(e)}>
        <p>
          <img className="pr-4" src="https://img.freepik.com/free-icon/search_318-265146.jpg"  style={{height: '25px', 'display':'inline-block'}}></img>
             Sign in with Google
        </p>
          </button>
      </div>
    </div>
  </div>
</div>


  );
};

export default LoginSignup;
