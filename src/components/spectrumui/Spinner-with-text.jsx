import React from "react";
import { Spinner } from "@/components/ui/spinner";

export function WaveSpinner() {
  return (
    <div className="flex items-center">
      <div className="w-2 h-0 bg-primary animate-[wave_1s_ease-in-out_infinite] rounded-lg">.</div>
      <div className="w-2 h-0 bg-primary animate-[wave_1s_ease-in-out_infinite_0.2s] rounded-lg">.</div>
      <div className="w-2 h-0 bg-primary animate-[wave_1s_ease-in-out_infinite_0.4s] rounded-lg">.</div>
      {/*<div className="w-2 h-1 bg-primary animate-[wave_1s_ease-in-out_infinite_0.12s] rounded-lg">o</div>*/}
    </div>
  );
}

const SpinnerWithText = ({ title }) => {

  return (
    <div className="fixed inset-0 bg-black-60 backdrop-blur-2xl flex justify-center items-center gap-3 z-[50] animate-fade-in">
      <div className="flex flex-col items-center gap-4">
        {/*<Spinner className="text-emerald-400">{title}</Spinner>*/}
        {/*<Spinner className="text-emerald-400"/>*/}
        <div className="grid grid-cols-2 gap-1">
          <span className="text-emerald-400">{title}</span>
          <div className="text-emerald-400">
            <WaveSpinner/>
          </div>
        </div>
        {/*<span className="text-zinc-300 text-sm font-semibold">*/}
        {/*  {description}*/}
        {/*</span>*/}
      </div>
    </div>
  );
};
export default SpinnerWithText;

