import "./Copyrights.css";

function Copyrights(): JSX.Element {
  const year = new Date().getFullYear();
  return (
    <div className="Copyrights">
      <p>All rights reserved to &copy; Ekrema Massarwe {year}</p>
    </div>
  );
}

export default Copyrights;
