import { Navbar } from "@/components/admin-panel/navbar";
import { Ibreadcrumb } from "@/types/breadcrumb";
interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  breadcrumbs: Ibreadcrumb[];
}

export function ContentLayout({
  title,
  children,
  breadcrumbs,
}: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} breadcrumbs={breadcrumbs} />
      <div className="w-full pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}
