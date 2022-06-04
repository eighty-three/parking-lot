import type { NextPage } from 'next';

import styles from '@/styles/Home.module.scss';

import { Time } from '@/components';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Time />
    </div>
  );
};

export default Home;
