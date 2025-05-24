import React from 'react';
import styled from 'styled-components';

import {
  timeAgo
} from '@/helpers';
import colors from '@/constants/colors';
import {
  Spinner,
  TableData
} from '@/components/common';

const Messages = ({isLoading, messagesData}) => (
  <Wrapper>
    {messagesData?.length ? messagesData.map((message) => (
      <Message>
        <MessageItem className={message?.sender === 'user' ? 'userMsg' : ''}>
          {/* <SenderName className={message?.sender === 'user' ? 'userMsg' : ''}>
            {message?.sender === 'user' ? 'You' : 'Stock Master AI'}
          </SenderName> */}
          {
            message?.content?.table_data ? (
              <TableData tableData={message?.content?.table_data} />
            ) : (
              <MessageContent className={message?.sender === 'user' ? 'userMsg' : ''}>
                <p dangerouslySetInnerHTML={{__html: message.content}} />
              </MessageContent>
            )
          }
          <MessageTime className={message?.sender === 'user' ? 'userMsg' : ''}>
            {timeAgo(message?.timestamp)}
          </MessageTime>
        </MessageItem>
      </Message>
    )) : null}
    {
      isLoading ? <Loader><Spinner /></Loader> : null
    }
  </Wrapper>
);

const Wrapper = styled.div``;

const Message = styled.div`
  margin: 20px 0;
`;

const MessageItem = styled.div`
  width: 100%;

  &.userMsg {
    margin-left: auto;
    width: fit-content;
    max-width: 70%;
  }
`;

const MessageContent = styled.div`
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${colors.Gunmetal};
  font-size: 16px;

  &.userMsg {
    margin-left: auto;
    background-color: ${colors.Jacarta};
  }
`;

const MessageTime = styled.div`
  margin-top: 5px;
  font-size: 13px;
  opacity: 0.75;

  &.userMsg {
    text-align: right;
  }
`;

const SenderName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 14px;
  opacity: 0.75;

  &.userMsg {
    justify-content: flex-end;
  }
`;

const Loader = styled.div``;

export default Messages;
