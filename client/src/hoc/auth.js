import axios from "axios";
import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { response } from "express";

export default function (SpecificComponent, option, adminRoute = null) {
  //null: 아무나 출입이 가능한 페이지
  //true: login한 유저만 출입 가능
  //false: login한 유저는 출입 불가능

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
      });
    }, []);
  }
  return AuthenticationCheck;
}
