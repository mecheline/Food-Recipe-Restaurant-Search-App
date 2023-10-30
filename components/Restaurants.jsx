const Restaurants = ({ data }) => {
  return (
    <div>
      <div className="text-center mb-5">
        <h5 className="text-muted fs-3">
          See the restaurants searched by users within their location
        </h5>
      </div>
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
            <div className="text-center">
              <h4 className="fs-1 text-muted">No data available</h4>
            </div>
          )}

          <tbody>
            {data &&
              data.map((record, index) => (
                <tr onClick={() => rowClick(record.id)} key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{record.name}</td>
                  <td>{record.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Restaurants;
