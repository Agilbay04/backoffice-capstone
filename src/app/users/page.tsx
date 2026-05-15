export default function UsersPage() {
  return (
    <main>
      <header>
        <h1>User Management</h1>
      </header>
      
      <section>
        <p>Filter</p>
      </section>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mama Ghufron</td>
            <td>Admin</td>
            <td>Active</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}