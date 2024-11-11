"use client";

import * as React from "react";
import { useState } from "react";

import { SETTINGS } from "@/utils/settings";

import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isEmail, isNullOrEmpty } from "@/utils/validate";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [emailErr, setEmailErr] = useState("");
	const [password, setPassword] = useState("");
	const [passwordErr, setPasswordErr] = useState("");

	const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setEmailErr("");
	};

	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setPasswordErr("");
	};

	const val = () => {
		let hasErr = false;

		if (isNullOrEmpty(email) || isNullOrEmpty(email.trim())) {
			hasErr = true;
			setEmailErr(SETTINGS.auth.err_email_required);
		} else if (!isEmail(email)) {
			hasErr = true;
			setEmailErr(SETTINGS.auth.err_email_valid);
		}

		if (isNullOrEmpty(password) || isNullOrEmpty(password.trim())) {
			hasErr = true;
			setPasswordErr(SETTINGS.auth.err_password_required);
		} else if ((password.trim() || []).length < 7) {
			hasErr = true;
			setPasswordErr(SETTINGS.auth.err_password_limit_6);
		}

		return hasErr;
	};

	const handleSubmit = () => {
		if (val()) return;

		const payload = {
			email,
			password,
		};

		console.log(payload);
	};

	return (
		<form className="px-6 py-8 rounded-[20px] w-[calc(100vw-48px)] md:w-[500px] bg-white backdrop-blur-sm shadow">
			<div className="mb-6">
				<h1 className="text-2xl ">Chào mừng tới Saymee CMS</h1>
				<p>Nhà mạng ảo dành cho gen Z</p>
			</div>

			<div className="relative">
				<Input
					value={email}
					onChange={handleChangeEmail}
					id="email"
					name="email"
					type="text"
					placeholder=""
					autoComplete="off"
					aria-describedby="outlined_error_help"
					className="peer pt-3 pb-0 h-[54px] text-sm text-black focus-visible:ring-0 rounded-lg border-none outline-none placeholder:text-sm placeholder:text-[#828295] shadow"
				/>
				<label
					htmlFor="email"
					className="absolute text-sm text-black duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
				>
					{SETTINGS.auth.label_email}
				</label>

				{emailErr && (
					<p
						id="outlined_error_help"
						className="mt-2 text-xs text-red-600 dark:text-red-400"
					>
						<span className="font-medium">{emailErr}</span>
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
