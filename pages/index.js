import React, {
  useEffect,
  useState
} from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import {
  ChatBox,
  FullScreenLoader
} from '@/components';

const index = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsPageLoading(false), 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Chat with StockMaster AI</title>
        <meta name="description" content="Chat with StockMaster AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isPageLoading ? <FullScreenLoader /> : (
        <ChatBoxWrapper>
          <ChatBox />
        </ChatBoxWrapper>
      )}

    </>
  );
};

export default index;

const ChatBoxWrapper = styled.div`
  height: 100svh;
  display: flex;
`;
