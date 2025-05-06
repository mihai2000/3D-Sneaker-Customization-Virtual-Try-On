import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../../store';

const Instructions: React.FC = () => {
  const snap = useSnapshot(state);

  return (
    <div
      className={`glassmorphism max-w border-[2px] rounded-lg flex-col justify-center items-center py-4 gap-4 absolute flex top-5 z-10 ml-3 ${
        !snap.current ? 'left-[0.1rem]' : 'hidden'
      }`}
    >
      <h1 className="xl:text-[10rem] ml-3 text-[3rem] xl:leading-[11rem] leading-[7rem] font-black text-black xs:mt-[25%] sm:mt-0 uppercase">
        Hello
      </h1>
    </div>
  );
};

export default Instructions;
