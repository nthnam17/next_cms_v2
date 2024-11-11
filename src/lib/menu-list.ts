import { Tag, Users, Settings, Bookmark, SquarePen, LayoutGrid, LucideIcon } from "lucide-react";

type Submenu = {
	href: string;
	label: string;
	active: boolean;
};

type Menu = {
	href: string;
	label: string;
	active: boolean;
	icon: LucideIcon;
	submenus: Submenu[];
};

type Group = {
	groupLabel: string;
	menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
	return [
		{
			groupLabel: "",
			menus: [
				{
					href: "/dashboard",
					label: "Dashboard",
					active: pathname.includes("/dashboard"),
					icon: LayoutGrid,
					submenus: [],
				},
			],
		},
		{
			groupLabel: "Danh mục",
			menus: [
				{
					href: "",
					label: "Quản lý bài viết",
					active: pathname.includes("/posts"),
					icon: SquarePen,
					submenus: [
						{
							href: "/posts",
							label: "Danh sách bài viết",
							active: pathname === "/posts",
						},
						{
							href: "/posts/new",
							label: "Bài viết mới nhất",
							active: pathname === "/posts/new",
						},
					],
				},
				{
					href: "/categories",
					label: "Danh mục bài viết",
					active: pathname.includes("/categories"),
					icon: Bookmark,
					submenus: [],
				},
				{
					href: "/tags",
					label: "Tags",
					active: pathname.includes("/tags"),
					icon: Tag,
					submenus: [],
				},
			],
		},
		{
			groupLabel: "Hệ thống",
			menus: [
				{
					href: "/users",
					label: "Quản lý người dùng",
					active: pathname.includes("/users"),
					icon: Users,
					submenus: [],
				},
				{
					href: "/account",
					label: "Cấu hình hệ thống",
					active: pathname.includes("/account"),
					icon: Settings,
					submenus: [],
				},
			],
		},
	];
}
