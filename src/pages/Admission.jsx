const steps = [
  "Understanding Admission requirements",
  "Submit application online",
  "Upload supporting documents",
  "Make application fee payment",
  "Check application status",
];

export default function Admission() {
  return (
    <section>
      <header className="page-header">
        <h1>Admission</h1>
        <p className="page-subtitle">How to apply to the university</p>
      </header>

      <div className="card">
        <div className="card-header">
          <h2>Admission process flow</h2>
          <span className="card-count">{steps.length} steps</span>
        </div>

        <ul className="admission-steps">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
