import Link from "next/link";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Ibreadcrumb } from "@/types/breadcrumb";
import dynamic from "next/dynamic";
import ListUsers from "@/components/users";

const breadcrumbs: Ibreadcrumb[] = [
  {
    name: "Users",
    path: "/users",
    isHere: true,
  },
];

export default function UsersPage() {
  return (
    <ContentLayout title="Quản lý người dùng" breadcrumbs={breadcrumbs}>
      <ListUsers></ListUsers>
    </ContentLayout>
  );
}
