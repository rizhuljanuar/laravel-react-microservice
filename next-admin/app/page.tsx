export default function Page() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand mb-0 h1">Next Admin</span>
      </nav>

      <div className="container-fluid">
        <div className="row">
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

          <main className="col-md-10 px-4 py-3">
            <h1 className="h2">Dashboard</h1>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Jack</td>
                  <td>Rizh</td>
                  <td>jack@example.com</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Budi</td>
                  <td>Santoso</td>
                  <td>budi@example.com</td>
                </tr>
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </>
  );
}
