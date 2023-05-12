import React from 'react';
import { ICosts } from '../../../types';
import CostsItem from '../CostsItem/CostsItem';

const CostsList = ({ costs }: { costs: ICosts[] }) => {
  return (
    <ul className="list-group">
      {costs.map((cost, i) => (
        <CostsItem cost={cost} index={i + 1} key={cost._id} />
      ))}
    </ul>
  );
};

export default CostsList;
