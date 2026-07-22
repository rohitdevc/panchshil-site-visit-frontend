import React, { useRef, useEffect } from "react";

type FormStagesProp = {
  step: number;
}

export function FormStages({step}: FormStagesProp) {
  const tabRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    const activeButton = tabRefs.current[step];

    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [step]);

  const stepsData = [
    {
      step: 1,
      stepCount: '01',
      stepName: 'Personal'
    },
    {
      step: 2,
      stepCount: '02',
      stepName: 'Direction'
    },
    {
      step: 3,
      stepCount: '03',
      stepName: 'Projects'
    },
    {
      step: 4,
      stepCount: '04',
      stepName: 'Configuration'
    },
    {
      step: 5,
      stepCount: '05',
      stepName: 'Review'
    }
  ]

  return (
    <ul className={`flex lg:justify-end items-center text-right gap-2 tracking-wider text-sm uppercase text-gray-500 overflow-x-auto w-full overflow-hidden`}>
      {
        stepsData.map((stepRow, key) => (
          <React.Fragment key={key}>
            <li className={`flex flex-col ${step === stepRow.step ? 'text-white' : ''}`} ref={(el) => { if (el) tabRefs.current[stepRow.step] = el}}><span>{stepRow.stepCount}</span> {stepRow.stepName}</li>
            <li className={`h-[0.5px] w-20 shrink-0 ${step === 1 ? 'bg-white' : 'bg-gray-500'}`}></li>
          </React.Fragment>
        ))
      }
    </ul>
  );
}
