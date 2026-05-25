import type { ReactNode } from 'react';
import { HeartPulse, Plus } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/patients" className="brand">
          <HeartPulse size={28} aria-hidden />
          <span>Customer Relationship Management</span>
        </Link>

        <nav className="nav-actions">
          <NavLink to="/patients">Pacientes</NavLink>
          <Link to="/patients/new" className="button primary">
            <Plus size={18} aria-hidden />
            Novo paciente
          </Link>
        </nav>
      </header>

      <main className="content">{children}</main>
    </div>
  );
}
