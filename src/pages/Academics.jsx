const modules = [
  { code: "BT1101", title: "Introduction to Business Analytics" },
  { code: "BT2101", title: "Econometrics Modelling for Business Analytics" },
  { code: "BT2102", title: "Data Management and Visualisation" },
  { code: "BT2103", title: "Optimization Methods in Business Analytics" },
];

export default function Academics() {
  return (
    <section>
      <header className="page-header">
        <h1>Academics</h1>
        <p className="page-subtitle">Modules taught at the university</p>
      </header>

      <div className="card">
        <div className="card-header">
          <h2>Business Analytics</h2>
          <span className="card-count">{modules.length} modules</span>
        </div>

        <table className="module-table">
          <thead>
            <tr>
              <th scope="col">Module Code</th>
              <th scope="col">Module Title</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((m) => (
              <tr key={m.code}>
                <td><span className="module-code">{m.code}</span></td>
                <td>{m.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
