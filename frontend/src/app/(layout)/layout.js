export default function RootLayout({ children }) {
  return (
    <>
      <div className="w-64 bg-green-500 h-full"></div>
      <div className="overflow-y-auto">{children}</div>
    </>
  );
}
