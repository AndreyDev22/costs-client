import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from './Header/Header';
import Spinner from '../Spinner/Spinner';
import { getAuthDataFromLS } from '../../utils/auth';
import { getCostsFx } from '../../api/costsClient';
import { $costs, setCosts } from '../../context';
import { useStore } from 'effector-react';
import CostsList from './CostsList/CostsList';

const CostsPage = () => {
  const [spinner, setSpinner] = useState(false);
  const store = useStore($costs);
  const shouldLoadCosts = useRef<boolean>(true);

  useEffect(() => {
    if (shouldLoadCosts.current) {
      handleGetCosts();

      shouldLoadCosts.current = false;
    }
  }, []);

  const handleGetCosts = async () => {
    setSpinner(true);
    const authData = getAuthDataFromLS();

    const costs = await getCostsFx({
      url: '/cost',
      token: authData.access_token,
    });

    setSpinner(false);
    setCosts(costs);
  };

  return (
    <div className="container mt-5">
      <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Учёт моих расходов</h2>
      {useMemo(
        () => (
          <Header costs={store} />
        ),
        [store],
      )}
      <div style={{ position: 'relative' }}>
        {spinner && <Spinner top={0} left={0} />}
        {useMemo(
          () => (
            <CostsList costs={store} />
          ),
          [store],
        )}
        {!spinner && !store.length && <h2>Список расходов пуст</h2>}
      </div>
    </div>
  );
};

export default CostsPage;
