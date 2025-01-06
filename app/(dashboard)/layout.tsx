import ReactQueryProvider from '@/app/providers';
import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dashboard__page">
      <DashboardSidebar />
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </div>
  );
}
