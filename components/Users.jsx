import { useRouter } from "next/router";

const Users = ({ data }) => {
  const router = useRouter();

  const rowClick = (id) => {
    router.push(`/usersDetail/${id}`);
  };
  return (
    <div class="table-responsive">
      <table class="table">
        {data.length > 0 ? (
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
            </tr>
          </thead>
        ) : (
          <div className="text-center">
            <h4 className="fs-1 text-muted">You have no authenticated User in this platform</h4>
          </div>
        )}

        <tbody>
          {data &&
            data.map((record, index) => (
              <tr onClick={() => rowClick(record.id)} key={index}>
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
