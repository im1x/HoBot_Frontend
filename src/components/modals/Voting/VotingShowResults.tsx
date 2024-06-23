import {VotingResult} from "../../../models/Voting.ts";
import React, {useCallback} from "react";
import {Box, Flex, Progress, Text} from "@mantine/core";

const VotingShowResults: React.FC<{votingResults : VotingResult[], totalVotes: number, colors: string[]}> = ({ votingResults, totalVotes, colors}) => {

  // Function to calculate percentage
  const calculatePercentage = useCallback((index: number): number => {
    if (votingResults[index].count === 0) {
      return 0;
    }
    const selectedResult = votingResults[index];
    return Math.round((selectedResult.count / totalVotes) * 100);
  }, [votingResults, totalVotes]);

  return (
    <>
      {votingResults.map((vr, index) => (
        <Box key={index} mb="sm">
          <Flex display="flex" justify="space-between">
            <Text span>{index + 1}. {vr.label}</Text>
            <Text span ta="right">{calculatePercentage(index)}% ({vr.count})</Text>
          </Flex>
          <Progress radius="md" size="xl" color={colors[index]} value={calculatePercentage(index)} />
        </Box>
      ))}

    </>
  );
};

export default VotingShowResults;
