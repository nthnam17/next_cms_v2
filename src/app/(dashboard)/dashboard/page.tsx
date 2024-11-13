"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CreateDashboard from "@/components/dashboard";
import { Ibreadcrumb } from "@/types/breadcrumb";
import { useEffect, useState } from "react";

// const [breadcrumbs,setBreadcrumbs] = useState([])

const breadcrumbs: Ibreadcrumb[] = [
  // {
  //   name: "users",
  //   path: "/users",
  //   isHere: true,
  // },
];

export default function DashboardPage() {
  return (
    <ContentLayout title="Trang chủ" breadcrumbs={breadcrumbs}>
      <CreateDashboard></CreateDashboard>
    </ContentLayout>
  );
}
