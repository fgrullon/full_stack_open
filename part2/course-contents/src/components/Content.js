import Totals from './Totals';
import Part from './Part';

const Content = ({ parts }) => {
    return (
      <>
        <div>
          {
            parts.map(part => <Part key={part.id} part={part} />)
          }
        </div>
        <div>
          <Totals parts={parts}/>
        </div>
      </>
    );
}

export default Content;