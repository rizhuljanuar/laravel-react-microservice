'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Menu = () => {
  const pathname = usePathname();

  return (
    <nav className="col-md-2 d-none d-md-block bg-light py-3">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            className={
              pathname === '/dashboard'
                ? 'nav-link active'
                : 'nav-link text-muted'
            }
            href="/dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={
              pathname === '/users'
                ? 'nav-link active'
                : 'nav-link text-muted'
            }
            href="/users"
          >
            Users
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
