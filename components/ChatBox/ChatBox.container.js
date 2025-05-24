import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import {
  useRouter
} from 'next/router';
import {
  toast
} from 'react-toastify';
import ChatBox from './ChatBox';
import {
  sendMsg
} from '@/api/chat';
import {
  tablesInfo
} from '@/constants';

const defaultMessages = [
  {
    sender: 'user',
    content: "Hey, what's the latest update on Apple stock?",
    timestamp: '2025-02-22T10:00:00Z'
  },
  {
    sender: 'bot',
    content: 'Apple Inc. (AAPL) is currently trading at $185.75, up 1.2% from the last session.',
    timestamp: '2025-02-22T10:00:05Z'
  },
  {
    sender: 'user',
    content: 'How is Tesla performing today?',
    timestamp: '2025-02-22T10:01:00Z'
  },
  {
    sender: 'bot',
    content: 'Tesla Inc. (TSLA) is down 2.3%, currently trading at $725.50.',
    timestamp: '2025-02-22T10:01:05Z'
  },
  {
    sender: 'user',
    content: 'Can you show me the top 3 gainers of the day?',
    timestamp: '2025-02-22T10:02:00Z'
  },
  {
    sender: 'bot',
    content: 'Here are the top 3 gainers today:<br>1. Nvidia (NVDA) +4.8%<br>2. Amazon (AMZN) +3.2%<br>3. Microsoft (MSFT) +2.9%',
    timestamp: '2025-02-22T10:02:05Z'
  },
  {
    sender: 'user',
    content: 'Whats the latest news on Bitcoin?',
    timestamp: '2025-02-22T10:03:00Z'
  },
  {
    sender: 'bot',
    content: 'Bitcoin (BTC) is currently trading at $45,200, up 0.5%.<br>Latest news: Institutional investors are showing increased interest in BTC ETFs.',
    timestamp: '2025-02-22T10:03:05Z'
  },
  {
    sender: 'bot',
    content: {table_data: [
      {
        currentHigh: 294.78,
        maxHigh: 433.2,
        is52WeekHigh: false
      },
      {
        currentHigh: 294.78,
        maxHigh: 433.2,
        is52WeekHigh: false
      },
      {
        currentHigh: 294.78,
        maxHigh: 433.2,
        is52WeekHigh: false
      },
      {
        currentHigh: 294.78,
        maxHigh: 433.2,
        is52WeekHigh: false
      }, {
        currentHigh: 294.78,
        maxHigh: 433.2,
        is52WeekHigh: false
      }
    ]},
    timestamp: '2025-02-22T10:03:05Z'
  }
];

const ChatBoxContainer = () => {
  const [tableNames, setTableNames] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tableInfo, setTableInfo] = useState({});
  const [messagesData, setMessagesData] = useState([]);

  const router = useRouter();

  const messagesEndRef = useRef(null);

  const scrollToChatBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, 200);
  };

  useEffect(() => {
    const storedTableNames = sessionStorage.getItem('tableNames');
    if (!storedTableNames) {
      router.push('/topic-selection');
    } else {
      const parsedTableNames = JSON.parse(storedTableNames);
      setTableNames(parsedTableNames);
      if (parsedTableNames[0]) {
        setTableInfo(tablesInfo[parsedTableNames[0]]);
      }
      scrollToChatBottom();
    }
  }, [router]);

  // Load messages from localStorage when the component mounts
  // useEffect(() => {
  //   const storedMessages = localStorage.getItem('chatMessages');
  //   if (storedMessages && storedMessages !== 'undefined') {
  //     setMessagesData(JSON.parse(storedMessages));
  //   }
  // }, []);

  const handleDeleteChat = () => {
    localStorage.removeItem('chatMessages');
    setMessagesData([]);
    toast.success('Chat Deleted Successfully!');
  };

  // Save messages to localStorage whenever they change
  // useEffect(() => {
  //   if (Array.isArray(messagesData) && messagesData.length > 0) {
  //     localStorage.setItem('chatMessages', JSON.stringify(messagesData));
  //   }
  // }, [messagesData]);

  const handleSendMsg = async () => {
    if (userInput.trim().length === 0) return;

    try {
      setIsLoading(true);
      const userMsgData = {
        sender: 'user',
        content: userInput,
        timestamp: new Date().toISOString()
      };
      setMessagesData((prev) => [...prev, userMsgData]);
      scrollToChatBottom();
      setUserInput('');
      const payload = {
        tables: tableNames,
        message: userInput
      };
      const res = await sendMsg(payload);
      const botMsgData = {
        sender: 'bot',
        content: res?.data,
        timestamp: new Date().toISOString()
      };
      setMessagesData((prev) => [...prev, botMsgData]);
    } catch (err) {
      toast.error(err.error);
    } finally {
      setIsLoading(false);
      scrollToChatBottom();
    }
  };

  return (
    <ChatBox
      tableInfo={tableInfo}
      messagesData={messagesData}
      tableNames={tableNames}
      setTableNames={setTableNames}
      userInput={userInput}
      setUserInput={setUserInput}
      isLoading={isLoading}
      messagesEndRef={messagesEndRef}
      handleSendMsg={handleSendMsg}
      handleDeleteChat={handleDeleteChat}
    />
  );
};
export default ChatBoxContainer;
