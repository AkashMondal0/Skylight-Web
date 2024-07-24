export default function RootLayout({ children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-dvh">
      {children}
    </div>
  )
}
