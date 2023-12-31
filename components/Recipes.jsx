

const Recipes = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className="text-center mb-5">
        <h5 className="text-muted fs-3">
          See how users searched their favorite recipes
        </h5>
      </div>
      <div className="table-responsive">
        <table className="table">
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
    </div>
  );
};

export default Recipes;
