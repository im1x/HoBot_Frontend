import React from "react";
import Theme from "./Theme.ts";
import {ResponsivePie} from "@nivo/pie";
import {VotingResult} from "../../models/Voting.ts";

const Bar: React.FC<{data: VotingResult[], colors: string[]}> =  ({ data, colors }) => {
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
