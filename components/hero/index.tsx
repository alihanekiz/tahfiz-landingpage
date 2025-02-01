import "./index.scss";

export default function Hero() {
  return (
    <div className="hero bg-primary">
      <div className="content">
        <h1>Hafızlık Merasimine hoşgeldiniz.</h1>
        <div className="d-flex my-3">
          <a href="#program" className="btn btn-primary">Program</a>
          <a href="https://tahfiz.org/" target="_blank" className="btn btn-secondary mx-2">Tahfiz hakkında</a>
        </div>
      </div>
    </div>
  )
}
