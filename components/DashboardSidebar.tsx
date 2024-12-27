'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <div className="dashboard__sidebar">
      <div className="dashboard__sidebar__mobile">
        <h3>Logo</h3>
      </div>
      <div className="dashboard__sidebar__desktop">
        <div className="dashboard__sidebar__desktop__logo">
          <h3>Logo</h3>
        </div>
        <div className="dashboard__sidebar__desktop__menu">
          <Link
            href="/dashboard"
            className={pathname === '/dashboard' ? 'active' : ''}
          >
            Shipments
          </Link>
          <Link href="/dashboard">User Profile</Link>
        </div>
      </div>
    </div>
  );
}
