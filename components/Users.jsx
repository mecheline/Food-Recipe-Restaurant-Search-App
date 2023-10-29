import { useRouter } from "next/router";

const Users = ({ data }) => {
  const router = useRouter();

  const rowClick = (id) => {
    router.push(`/usersDetail/${id}`);
  };
  return (
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((record, index) => (
              <tr onClick={() => rowClick(record.id)}>
                <th scope="row">{index + 1}</th>
                <td>{record.fullname}</td>
                <td>{record.email}</td>
                <td>{record.gender}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
