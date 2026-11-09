const Dashboard = () => {
  return (
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
  );
};

export default Dashboard;
