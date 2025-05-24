import Head from 'next/head';
import React from 'react';

import {
  ChatBox
} from '@/components';

const index = () => (
  <>
    <Head>
      <title>Chat with StockMaster AI</title>
    </Head>
    <ChatBox />
  </>
);

export default index;
