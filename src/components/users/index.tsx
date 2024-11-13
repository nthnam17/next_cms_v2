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
import { fnGetListUsers } from "@/stores/users";
import { useStore } from "@/hooks/use-store";
import { IUserParams, IUsersTable } from "@/types/user";

export default function ListUsers() {
  const [lstUsers, SetLstUser] = useState<IUsersTable>();
  const [params, SetParams] = useState<IUserParams>({
    name: "",
  });

  useEffect(() => {
    handleGetLstUsers(params);
  }, [params]);

  const handleGetLstUsers = async (params: any) => {
    const res: any = await fnGetListUsers(params);
    console.log(res);
  };

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];
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
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
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
