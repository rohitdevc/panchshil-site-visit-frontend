type FormStagesProp = {
  step: number;
}

export function FormStages({step}: FormStagesProp) {
  return (
    <ul className={`flex justify-center items-center text-right gap-2 tracking-wider text-sm uppercase text-gray-500 font-open-sans`}>
      <li className={`flex flex-col ${step === 1 ? 'text-white' : ''}`}><span>01</span> PERSONAL</li>
      <li className={`h-[0.5px] w-20 ${step === 1 ? 'bg-white' : 'bg-gray-500'}`}></li>
      <li className={`flex flex-col ${step === 2 ? 'text-white' : ''}`}><span>02</span> DIRECTION</li>
      <li className={`h-[0.5px] w-20  ${step === 2 ? 'bg-white' : 'bg-gray-500'}`}></li>
      <li className={`flex flex-col ${step === 3 ? 'text-white' : ''}`}><span>03</span> PROJECTS</li>
      <li className={`h-[0.5px] w-20  ${step === 3 ? 'bg-white' : 'bg-gray-500'}`}></li>
      <li className={`flex flex-col ${step === 4 ? 'text-white' : ''}`}><span>04</span> CONFIGURATION</li>
      <li className={`h-[0.5px] w-20  ${step === 4 ? 'bg-white' : 'bg-gray-500'}`}></li>
      <li className={`flex flex-col ${step === 5 ? 'text-white' : ''}`}><span>05</span> REVIEW</li>
      <li className={`h-[0.5px] w-20  ${step === 5 ? 'bg-white' : 'bg-gray-500'}`}></li>
    </ul>
  );
}
