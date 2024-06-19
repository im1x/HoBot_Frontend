import React from "react";
import Theme from "./Theme.ts";
import {ResponsivePie} from "@nivo/pie";
import {VotingResult} from "../../models/Voting.ts";

const Bar: React.FC<{data: VotingResult[]}> =  ({ data }) => {
  const colors = ['#FF6347', '#32CD32', '#4682B4', '#FF69B4', '#8B4513', '#9932CC', '#2E8B57', '#FFC300', '#8B0000', '#20B2AA'];
  return (
    <ResponsivePie
      data={data}
      theme={Theme}
      colors={colors}
      id="label"
      value="count"
      arcLinkLabelsDiagonalLength={10}
      arcLinkLabelsStraightLength={10}
      arcLinkLabelsSkipAngle={10}
      margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
      fit={true}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      arcLinkLabelsTextColor={{ from: 'color' }}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            2
          ]
        ]
      }}
    />
  )
}

export default Bar;
