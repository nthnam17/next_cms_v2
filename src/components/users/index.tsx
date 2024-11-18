"use client";
import { Accordion } from "@radix-ui/react-accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { NextInput } from "../common/next-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { STATUS } from "@/utils/enum";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useEffect, useState } from "react";
import { IUserParams, IUsersTable } from "@/types/user";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { EllipsisVertical, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ScrollArea } from "../ui/scrollarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CreateUser from "./create";
import Image from "next/image";
import UpdateUser from "./update";

export default function ListUsers() {
  const [lstUsers, setLstUser] = useState<IUsersTable[] | []>();
  const [params, SetParams] = useState<IUserParams>({
    name: "",
    status: "",
  });

  const headerTable = [
    {
      name: "STT",
      class_name: "w-[50px]",
    },
    {
      name: "Ảnh đại diện",
      class_name: "w-[160px]",
    },
    {
      name: "Tên tài khoản",
      class_name: "",
    },
    {
      name: "Tên đầy đủ",
      class_name: "",
    },
    {
      name: "Trạng thái",
      class_name: "",
    },
    {
      name: "Thao tác",
      class_name: "w-[100px]",
    },
  ];

  useEffect(() => {
    handleGetLstUsers(params);
  }, []);

  const handleGetLstUsers = async (params: any) => {
    const path = "users";
    const queryString = new URLSearchParams(params).toString();
    try {
      const req = await fetch(`/api/${path}?${queryString}`);
      const res = await req.json();

      if (res.status == 200) {
        setLstUser(res.data.items);
      } else {
        toast.error("Lấy dữ liệu thất bại", {
          description: "Có lỗi xin vui lòng thử lại sau",
          action: {
            label: "Ẩn đi",
            onClick: () => "",
          },
        });
      }
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        {/* <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription> */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Tìm kiếm</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-4 gap-3 pt-2">
                <NextInput
                  placeholder="Tên người dùng"
                  onChange={(e) => {
                    SetParams((prevParams: any) => ({
                      ...prevParams,
                      name: e.target.value,
                    }));
                  }}
                />
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
                <div className="flex">
                  <Button>Tìm kiếm</Button>
                  <div className="pl-2">
                    <Button variant="outline">Làm mới</Button>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardHeader>

      <CardContent>
        <div className="pb-4 float-right">
          <CreateUser></CreateUser>
        </div>
        <Table className="h-[1000px] overflow-y-scroll h-10 bg-muted">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              {headerTable &&
                headerTable.map((_header, index) => (
                  <TableHead key={index} className={_header.class_name}>
                    {_header.name}
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {lstUsers &&
              lstUsers.map((_item, index) => (
                <TableRow key={index + 1}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Image
                      className="object-contain rounded-full"
                      src={
                        _item.image
                          ? _item.image
                          : "/assets/image/user-default.jpg"
                      }
                      alt=""
                      width={60}
                      height={60}
                    ></Image>
                  </TableCell>
                  <TableCell>{_item.username}</TableCell>
                  <TableCell>{_item.name}</TableCell>
                  <TableCell>
                    {_item.status == 1 ? (
                      <Badge variant={"success"}>Hoạt động</Badge>
                    ) : (
                      <Badge variant={"error"}>Khóa</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <DropdownMenuTrigger asChild>
                              <Button
                                // variant="outline"
                                className="w-[50px]"
                              >
                                <EllipsisVertical size={55} />
                              </Button>
                            </DropdownMenuTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Thao tác</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <DropdownMenuContent className="w-50" align="center">
                        <DropdownMenuItem
                          className="hover:cursor-pointer"
                          asChild
                          onClick={() => {
                            console.log(1);
                          }}
                        >
                          <UpdateUser></UpdateUser>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            className="hover:cursor-pointer hover:bg-red-500"
                            asChild
                          >
                            <div className="w-full flex items-center justify-item-center">
                              <Trash2 size={20} />
                              <p className="text-sm font-medium leading-none pl-2">
                                Xóa
                              </p>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
          <TableFooter></TableFooter>
        </Table>
      </CardContent>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
