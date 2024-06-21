import React from "react";
import {VotingResult} from "../../../models/Voting.ts";
import {Text} from "@mantine/core";

const VotingShowResults: React.FC<{votingResults : VotingResult[]}> = ({ votingResults}) => {

  return (
    <div>
      {votingResults.map((vr, index) => (
        <Text>{index + 1}. {vr.label}</Text>
      ))}
    </div>
  );
}

export default VotingShowResults;
