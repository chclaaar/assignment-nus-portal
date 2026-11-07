import nusLogo from "../assets/nus-logo.png";

export default function Home() {
  return (
    <section className="home">
      <img src={nusLogo} alt="NUS logo" className="home-logo" />
      <p className="home-tagline">NUS is a leading research university in Asia</p>
    </section>
  );
}
