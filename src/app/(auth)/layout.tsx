import AuthLayout from "@/components/auth/auth-layout";

export default function AuLayout({ children }: { children: React.ReactNode }) {
	return <AuthLayout>{children}</AuthLayout>;
}
