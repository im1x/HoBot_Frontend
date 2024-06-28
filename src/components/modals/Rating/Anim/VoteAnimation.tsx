import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {VotingState} from "../../../../models/Voting.ts";
import {votingActions} from "../../../../store/reducers/VotingSlice.ts";
import {store} from "../../../../store/store.ts";

gsap.registerPlugin(useGSAP);

const VoteAnimation: React.FC<{ voting: VotingState, getColorByNum: (rating: number) => string }> = ({ voting, getColorByNum }) => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (voting.votes.length > 0) {
      const tmpVotes = [...voting.votes];
      tmpVotes.map((vote) => {
        createAnim(vote.name, vote.vote);
      });
      store.dispatch(votingActions.deleteVotes(tmpVotes.length));
    }
  }, [voting.votes]);

  const createAnim = (text: string, rating: number) => {
    const canvasWidth = 740;
    const canvasHeight = 420;
    const horizontalOffset = 10;
    const verticalOffset = 260;
    const textWidth = 100; // assumed width of text element
    const textHeight = 20; // assumed height of text element

    const x = horizontalOffset + Math.random() * (canvasWidth - textWidth);
    const y = verticalOffset + Math.random() * (canvasHeight - textHeight);

    const textElement = document.createElement('div');
    textElement.textContent = `${text} ${rating}`;
    textElement.style.position = 'absolute';
    textElement.style.left = `${x}px`;
    textElement.style.top = `${y}px`;
    textElement.style.color = getColorByNum(rating);
    textElement.style.fontSize = '22px';

    console.log("X: " + x + " Y: " + y);

    // append element to container ref
    container.current?.appendChild(textElement);

    gsap.to(textElement, {
      y: '+=50',
      opacity: 0,
      duration: 2,
      ease: 'power1.inOut',
      onComplete: () => {
        container.current?.removeChild(textElement);
      },
    });
  };

  return (
    <div ref={container} style={{"width": "740px", "height": "440px"}}/>
  );
}

export default VoteAnimation;
