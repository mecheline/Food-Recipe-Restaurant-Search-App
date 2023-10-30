const Recipes = ({ data }) => {
  console.log(data);
  return (
    <div class="table-responsive">
      <table class="table">
        {data.length > 0 ? (
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name of Recipe</th>
              <th scope="col">Frequency</th>
            </tr>
          </thead>
        ) : (
          <h4 className="fs-1 text-muted text-center">No data available</h4>
        )}

        <tbody>
          {data
            ? data.map((record, index) => (
                <tr onClick={() => rowClick(record.id)} key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{record.name}</td>
                  <td>{record.quantity}</td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default Recipes;
