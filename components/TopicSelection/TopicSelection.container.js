import React, {
  useState
} from 'react';
import {
  useRouter
} from 'next/router';
import TopicSelection from './TopicSelection';

const TopicSelectionContainer = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const router = useRouter();

  const handleContinue = () => {
    if (!selectedTopic) return;

    const tableNames = [selectedTopic.dataSource];
    sessionStorage.setItem('tableNames', JSON.stringify(tableNames));
    router.push('/');
  };

  return (
    <TopicSelection
      selectedTopic={selectedTopic}
      setSelectedTopic={setSelectedTopic}
      handleContinue={handleContinue}
    />
  );
};

export default TopicSelectionContainer;
