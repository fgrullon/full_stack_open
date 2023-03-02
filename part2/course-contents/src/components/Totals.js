
const Totals = ({ parts }) => {
    const total = parts.reduce((s,p) => s + p.exercises, 0);
    return(
      <h4>total of { total } exercises</h4>
    );
}

export default Totals;