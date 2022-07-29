import React from "react";
import Loginfo from '../component/Loginfo/Loginfo.js';
import Logo from "../component/logo/Logo";
import Downcurve from "../component/Downcurve/Downcurve";



const login = () => {
  return (
    <div>
      <Logo />
      
      <Loginfo />
      <Downcurve />
    </div>
  );
};

export default login;
