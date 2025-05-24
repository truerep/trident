import React from 'react';
import styled from 'styled-components';

import {
  toast
} from 'react-toastify';
import colors from '@/constants/colors';
import Messages from './components';
import {
  tablesInfo,
  validTableCombinations
} from '@/constants';

const ChatBox = ({
  tableInfo,
  messagesData,
  tableNames,
  setTableNames,
  userInput,
  setUserInput,
  isLoading,
  messagesEndRef,
  handleSendMsg,
  handleDeleteChat
}) => {
  // Helper to get next possible tables for the current selection
  const getNextOptions = (currentSelection) => validTableCombinations
    .filter((combo) => combo.length > currentSelection.length && combo.slice(0, currentSelection.length).every((t, i) => t === currentSelection[i]))
    .map((combo) => combo[currentSelection.length])
    .filter((v, i, arr) => arr.indexOf(v) === i && !currentSelection.includes(v)) // unique, not already selected
  ;

  // Handler for dropdown change
  const handleTableChange = (level, e) => {
    const selected = e.target.value;
    console.log(level, e);
    // Reset all selections after this level
    const newTableNames = tableNames.slice(0, level);
    if (selected) newTableNames[level] = selected;
    setTableNames(newTableNames);
    sessionStorage.setItem('tableNames', JSON.stringify(newTableNames));
    toast.success('Data Source Changed!');
  };

  // Generate dropdowns
  const renderDropdowns = () => {
    const dropdowns = [];
    let currentSelection = [];
    let nextOptions = Object.values(tablesInfo).map((t) => t.dataSource);

    for (let level = 0; level < 3 && nextOptions.length > 0; level++) {
      // Use a function to capture the current level
      const handleChange = (e) => handleTableChange(level, e);

      dropdowns.push(
        <select
          key={level}
          value={tableNames[level] || ''}
          onChange={handleChange}
          style={{marginRight: 8}}
        >
          <option value="">
            {level === 0 ? 'Primary' : level === 1 ? 'Secondary' : 'Tertiary'}
            {' '}
            Source (optional)
          </option>
          {nextOptions.map((ds) => (
            <option key={ds} value={ds} disabled={currentSelection.includes(ds)}>
              {tablesInfo[ds]?.name || ds}
            </option>
          ))}
        </select>
      );
      if (!tableNames[level]) break;
      currentSelection = [...currentSelection, tableNames[level]];
      nextOptions = getNextOptions(currentSelection);
      if (nextOptions.length === 0) break;
    }
    return dropdowns;
  };

  return (
    <PageWrapper>
      <Container>
        <ChatTableActions>
          <TableSelectWrapper>
            <p>
              Data Source
              {tableNames.length > 1 ? 's' : ''}
            </p>
            {renderDropdowns()}
          </TableSelectWrapper>
        </ChatTableActions>
        <ChatContent>
          <Messages
            isLoading={isLoading}
            messagesData={messagesData}
          />
          <div ref={messagesEndRef} />
        </ChatContent>
        <MsgActionsWrapper>
          <MsgActions>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMsg();
                }
              }}
              placeholder="Try asking something..."
            />
            <ChatSendBtn
              onClick={handleSendMsg}
              className={userInput?.length > 0 ? 'show' : ''}
            >
              <img src="/assets/icons/sent.png" alt="Send" />
            </ChatSendBtn>
          </MsgActions>
        </MsgActionsWrapper>
      </Container>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  padding: 20px 0;
  flex: 1;
  background-color: ${colors.DarkGunmetal};
  color: #fff;
  display: flex;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
`;

const ChatTableActions = styled.div`
  border-bottom: 1px solid ${colors.Jacarta};
  padding: 0 30px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const TableSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    white-space: nowrap;
  }

  select {
    background-color: ${colors.Jacarta};
    color: white;
    padding: 10px;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 14px;
    border: 0;
    min-width: 200px;

    &:not(:last-child) {
      margin-right: 5px;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const ChatContent = styled.div`
  flex: 1;
  overflow: auto;
  padding: 0 30px;
`;

const MsgActionsWrapper = styled.div`
  padding: 0 30px;
`;

const MsgActions = styled.div`
  border-radius: 10px;
  background-color: ${colors.Gunmetal};
  display: flex;
  align-items: center;
  overflow: hidden;

  input {
    background-color: transparent;
    flex: 1;
    padding: 10px 10px;
    border: none;
    outline: none;
    color: #fff;
    font-size: 16px;

    &::placeholder {
      color: #ccc;
      font-size: 16px;
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
  }

  button img {
    height: 22px;
  }
`;

const ChatSendBtn = styled.button`
  padding: 10px 15px;
  transform: translateX(100%);
  transition: all 0.2s ease-in-out;

  &.show {
    transform: translateX(0);
  }
`;

export default ChatBox;
