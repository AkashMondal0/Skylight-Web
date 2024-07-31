import { NavigationSidebar } from "@/components/Navigation/NavigationSidebar";

export default function RootLayout({ children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-dvh flex">
      <NavigationSidebar />
      {children}
    </div>
  )
}
