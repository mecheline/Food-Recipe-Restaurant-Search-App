const Restaurants = ({ data }) => {
  return (
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name of Recipe</th>
            <th scope="col">Frequency</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((record, index) => (
              <tr onClick={() => rowClick(record.id)}>
                <th scope="row">{index + 1}</th>
                <td>{record.name}</td>
                <td>{record.quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Restaurants;
