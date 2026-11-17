'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { canView } from '@/utils/user';

const menuItems = [
  { page: 'users', label: 'Users' },
  { page: 'roles', label: 'Roles' },
  { page: 'products', label: 'Products' },
  { page: 'orders', label: 'Orders' },
];

const Menu = () => {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.user.user);

  const linkClass = (href: string) =>
    pathname === href ? 'nav-link active' : 'nav-link text-muted';

  return (
    <nav className="col-md-2 d-none d-md-block bg-light py-3">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className={linkClass('/dashboard')} href="/dashboard">
            Dashboard
          </Link>
        </li>

        {menuItems
          .filter((item) => user && canView(user, item.page))
          .map((item) => (
            <li className="nav-item" key={item.page}>
              <Link
                className={linkClass(`/${item.page}`)}
                href={`/${item.page}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Menu;
