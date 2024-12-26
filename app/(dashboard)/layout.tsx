import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dashboard__page">
      <DashboardSidebar />
      {children}
    </div>
  );
}
