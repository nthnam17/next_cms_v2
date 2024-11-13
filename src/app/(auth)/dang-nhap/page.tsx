"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { SETTINGS } from "@/utils/settings";

import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isNullOrEmpty } from "@/utils/validate";
import { fnLogin } from "@/stores/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameErr("");
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordErr("");
  };

  const val = () => {
    let hasErr = false;

    if (isNullOrEmpty(username) || isNullOrEmpty(username.trim())) {
      hasErr = true;
      setUsernameErr(SETTINGS.auth.err_username_required);
    } else if ((username.trim() || []).length < 3) {
      hasErr = true;
      setUsernameErr(SETTINGS.auth.err_username_limit_3);
    } else if ((username.trim() || []).length > 18) {
      hasErr = true;
      setUsernameErr(SETTINGS.auth.err_username_limit_3);
    }

    if (isNullOrEmpty(password) || isNullOrEmpty(password.trim())) {
      hasErr = true;
      setPasswordErr(SETTINGS.auth.err_password_required);
    } else if (password.trim().length < 6) {
      hasErr = true;
      setPasswordErr(SETTINGS.auth.err_password_limit_6);
    } else if (password.trim().length > 18) {
      hasErr = true;
      setPasswordErr(SETTINGS.auth.err_password_limit_6);
    }

    return hasErr;
  };

  const handleSubmit = async () => {
    if (val()) return;

    const payload = {
      username,
      password,
    };

    try {
      const res: any = await fnLogin(payload);

      if (res.error.code == 200) {
      }

      console.log(res);

      console.log(payload);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    const handleKeyUp = (event: any) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleSubmit]);

  return (
    <form className="px-6 py-8 rounded-[20px] w-[calc(100vw-48px)] md:w-[500px] bg-white backdrop-blur-sm shadow">
      <div className="mb-6">
        <h1 className="text-2xl ">ChillAndFree CMS</h1>
        <p>Hãy tận hưởng không gian của riêng bạn</p>
      </div>

      <div className="relative">
        <Input
          value={username}
          onChange={handleChangeUsername}
          id="username"
          name="username"
          type="text"
          placeholder=""
          autoComplete="off"
          aria-describedby="outlined_error_help"
          className="peer pt-3 pb-0 h-[54px] text-sm text-black focus-visible:ring-0 rounded-lg border-none outline-none placeholder:text-sm placeholder:text-[#828295] shadow"
        />
        <label
          htmlFor="username"
          className="absolute text-sm text-black duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          {SETTINGS.auth.label_username}
        </label>

        {usernameErr && (
          <p
            id="outlined_error_help"
            className="mt-2 text-xs text-red-600 dark:text-red-400"
          >
            <span className="font-medium">{usernameErr}</span>
          </p>
        )}
      </div>

      <div className="relative mt-4">
        <Input
          value={password}
          onChange={handleChangePassword}
          id="password"
          name="password"
          type="password"
          placeholder=""
          autoComplete="off"
          className="peer pt-3 pb-0 h-[54px] text-sm text-black shadow focus-visible:ring-0 rounded-lg border-none outline-none placeholder:text-sm placeholder:text-[#828295]"
        />
        <label
          htmlFor="password"
          className="absolute text-sm text-black duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          {SETTINGS.auth.label_password}
        </label>
        {passwordErr && (
          <p
            id="outlined_error_help"
            className="mt-2 text-xs text-red-600 dark:text-red-400"
          >
            <span className="font-medium">{passwordErr}</span>
          </p>
        )}
      </div>

      <div className="mt-8 w-full flex justify-center">
        <Button
          type="button"
          className="px-10 h-11 rounded-full bg-white text-[#000000] hover:bg-white"
          onClick={handleSubmit}
        >
          {SETTINGS.general.login}
        </Button>
      </div>
    </form>
  );
}
