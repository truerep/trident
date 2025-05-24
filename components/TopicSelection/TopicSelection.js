import React from 'react';
import styled from 'styled-components';

import {
  tablesInfo, colors
} from '@/constants';

const topics = tablesInfo;

const TopicSelection = ({selectedTopic, setSelectedTopic, handleContinue}) => (
  <Container>
    <ContentWrapper>
      <Title>Select a Data Source</Title>
      <Subtitle>Choose what type of financial data you&apos;d like to explore</Subtitle>

      <TopicsGrid>
        {Object.values(topics).map((topic) => (
          <TopicCard
            key={topic.id}
            isSelected={selectedTopic?.id === topic.id}
            onClick={() => setSelectedTopic(topic)}
          >
            <TopicContent>
              <TopicIcon>{topic.icon}</TopicIcon>
              <TopicName>{topic.name}</TopicName>
              <TopicDescription>{topic.description}</TopicDescription>

              {/* <UseCaseContainer>
                  <UseCaseLabel>Use Case</UseCaseLabel>
                  <UseCase>{topic.useCase}</UseCase>
                </UseCaseContainer> */}

              <DataSource>{topic.useCase}</DataSource>
            </TopicContent>
          </TopicCard>
        ))}
      </TopicsGrid>

      {selectedTopic && (
        <ButtonContainer>
          <Button onClick={handleContinue}>
            Continue
          </Button>
        </ButtonContainer>
      )}
    </ContentWrapper>
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${colors.DarkGunmetal};
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #d1d5db;
  margin-bottom: 32px;
  text-align: center;
`;

const TopicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TopicCard = styled.div`
  background-color: ${(props) => (props.isSelected ? colors.Jacarta : colors.Gunmetal)};
  border-radius: 0.5rem;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${(props) => (props.isSelected ? '0 0 0 2px #93c5fd' : 'none')};
  height: 100%;
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;

const TopicContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
`;

const TopicIcon = styled.span`
  font-size: 2.25rem;
  margin-bottom: 16px;
`;

const TopicName = styled.h3`
  font-weight: bold;
  color: white;
  margin-bottom: 12px;
  font-size: 1.25rem;
`;

const TopicDescription = styled.p`
  color: #d1d5db;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const UseCaseContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 12px;
  width: 100%;
  margin-top: auto;
  margin-bottom: 16px;

`;

const UseCaseLabel = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #93c5fd;
  margin-bottom: 4px;
  font-weight: 500;
`;

const UseCase = styled.p`
  color: white;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const DataSource = styled.div`
  font-size: 0.75rem;
  color: #93c5fd;
  background-color: rgba(147, 197, 253, 0.1);
  padding: 4px 10px;
  border-radius: 4px;
  font-family: monospace;
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background-color: ${colors.Jacarta};
  color: white;
  padding: 12px 32px;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 1rem;
  
  &:hover {
    background-color: #4a4a6a;
    transform: translateY(-1px);
  }
`;

export default TopicSelection;
