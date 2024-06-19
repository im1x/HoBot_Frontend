import {VotingResult} from "../../models/Voting.ts";
import React, {useCallback, useMemo} from "react";
import {Box, Flex, Progress, Text} from "@mantine/core";

const VotingShowResults: React.FC<{votingResults : VotingResult[]}> = ({ votingResults}) => {

  const colors = ['#FF6347', '#32CD32', '#4682B4', '#FF69B4', '#8B4513', '#9932CC', '#2E8B57', '#FFC300', '#8B0000', '#20B2AA'];

  const totalVotes = useMemo(() => {
    return votingResults.reduce((sum, result) => sum + result.count, 0);
  }, [votingResults]);

  // Function to calculate percentage
  const calculatePercentage = useCallback((index: number): number => {
    if (votingResults[index].count === 0) {
      return 0;
    }
    const selectedResult = votingResults[index];
    return Math.round((selectedResult.count / totalVotes) * 100);
  }, [votingResults, totalVotes]);

  return (
    <div>
      {votingResults.map((vr, index) => (
        <Box key={index} mb="sm">
          <Flex display="flex" justify="space-between">
            <Text span>{index + 1}. {vr.label}</Text>
            <Text span ta="right">{calculatePercentage(index)}% ({vr.count})</Text>
          </Flex>
          <Progress radius="md" size="xl" color={colors[index]} value={calculatePercentage(index)} />
        </Box>
      ))}

    </div>
  );
};

export default VotingShowResults;
