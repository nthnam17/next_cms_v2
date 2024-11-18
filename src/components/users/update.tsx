"use client";

import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import NextDialogForm from "@/components/common/next-dialog-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Pencil, Plus } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { NextInput } from "@/components/common/next-input";
import { NextTextarea } from "@/components/common/next-textarea";
import { isNullOrEmpty } from "@/utils/validate";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { STATUS } from "@/utils/enum";

export default function UpdateUser() {
  const [open, setOpen] = useState(false);

  const [val1, setVal1] = useState("");
  const [errVal1, setErrVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [errVal2, setErrVal2] = useState("");
  const [val3, setVal3] = useState("");
  const [errVal3, setErrVal3] = useState("");

  const handleChangeVal1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal1(e.target.value);
    setErrVal1("");
  };

  const handleChangeVal2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal2(e.target.value);
    setErrVal2("");
  };

  const handleChangeVal3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal3(e.target.value);
    setErrVal3("");
  };

  const fnSubmit = () => {
    if (val()) return;

    const payload = {
      val1,
      val2,
      val3,
    };

    setOpen(false);
    console.log(payload);
  };

  const val = () => {
    let hasErr = false;

    if (isNullOrEmpty(val1) || isNullOrEmpty(val1.trim())) {
      hasErr = true;
      setErrVal1("Không được để trống !");
    }

    if (isNullOrEmpty(val2) || isNullOrEmpty(val2.trim())) {
      hasErr = true;
      setErrVal2("Không được để trống !");
    }

    if (isNullOrEmpty(val3) || isNullOrEmpty(val3.trim())) {
      hasErr = true;
      setErrVal3("Không được để trống !");
    }

    return hasErr;
  };

  return (
    <NextDialogForm
      open={open}
      title="Tạo mới người dùng"
      isCreate={false}
      trigger={
        <Button variant={"outline"}>
          <Pencil size={20} /> <p className="pl-1">Cập nhật</p>
        </Button>
      }
      onToggle={setOpen}
      onSuccess={fnSubmit}
      className="max-w-[1000px]"
    >
      <div className="p-4 rounded-2xl bg-white">
        <div className="mb-3"></div>

        <div className="grid gap-3 grid-cols-2 mb-3">
          <div>
            <label className="text-sm font-normal text-label">
              Tên đầy đủ <span className="text-error">*</span>
            </label>
            <div className="mt-1">
              <NextInput
                value={val1}
                onChange={handleChangeVal1}
                placeholder="Nhập tên đầy đủ"
              />
            </div>

            {errVal1 && (
              <p className="mt-1 text-[13px] text-error">{errVal1}</p>
            )}
          </div>
          <div className="">
            <label className="text-sm font-normal text-label">
              Email <span className="text-error">*</span>
            </label>
            <div className="mt-1">
              <NextInput
                value={val2}
                onChange={handleChangeVal2}
                placeholder="Nhập email"
              />
            </div>

            {errVal2 && (
              <p className="mt-1 text-[13px] text-error">{errVal2}</p>
            )}
          </div>

          <div className="">
            <label className="text-sm font-normal text-label">
              Số điện thoại <span className="text-error">*</span>
            </label>
            <div className="mt-1">
              <NextInput
                value={val3}
                onChange={handleChangeVal3}
                placeholder="Nhập số điện thoại"
              />
            </div>

            {errVal3 && (
              <p className="mt-1 text-[13px] text-error">{errVal3}</p>
            )}
          </div>
          <div className="">
            <label className="text-sm font-normal text-label">
              Tên tài khoản <span className="text-error">*</span>
            </label>
            <div className="mt-1">
              <NextInput
                value={val3}
                onChange={handleChangeVal3}
                placeholder="Nhập tên tài khoản"
              />
            </div>

            {errVal3 && (
              <p className="mt-1 text-[13px] text-error">{errVal3}</p>
            )}
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Trạng thái" defaultValue={""} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {STATUS.map((_status) => (
                    <SelectItem key={_status.value} value={_status.value}>
                      {_status.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Trạng thái" defaultValue={""} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {STATUS.map((_status) => (
                    <SelectItem key={_status.value} value={_status.value}>
                      {_status.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="">
          <label className="text-sm font-normal text-label">Mô tả</label>
          <div className="mt-1">
            <NextTextarea placeholder="Nhập nội dung" />
          </div>
        </div>
      </div>
    </NextDialogForm>
  );
}
