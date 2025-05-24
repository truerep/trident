import React from 'react';

import Messages from './Messages';

const MessagesContainer = ({isLoading, messagesData}) => (
  <Messages isLoading={isLoading} messagesData={messagesData} />
);

export default MessagesContainer;
