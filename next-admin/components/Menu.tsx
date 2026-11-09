const Menu = () => {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light py-3">
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link active" href="/">Dashboard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-muted" href="/users">Users</a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
