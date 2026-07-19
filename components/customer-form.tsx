"use client"

import { PanchshilMark } from "./panchshil-mark";
import { FormStages } from "./form-stages";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { zapfHumanist601Roman } from "@/app/fonts";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { countries } from 'countries-list'
import SelectTagArrow from "./select-tag-arrow";

type PersonalForm = {
  title: string;
  firstName: string;
  lastName: string;
  countryCode: number;
  mobileNumber: string;
  alternateCountryCode: number;
  alternateNumber: string;
  email: string;
  organisation: string;
  designation: string;
  country: string;
  pincode: string;
  city: string;
  address: string;
};

const countryArray = Object.values(countries)
.map(c => ({
  name: c.name,
  phone: c.phone[0]
})).sort((a, b) => {
  if (a.name === "India") return -1;
  if (b.name === "India") return 1;
  return a.name.localeCompare(b.name);
});

export function CustomerFormPage() {
  const basePath = process.env.NEXT_PUBLIC_PATH || "/";

  const [currentStep, updateCurrentStep] = useState(2);

  const personalFormRef = useRef<HTMLFormElement>(null);
  const categoryFormRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<PersonalForm>({
    title: "",
    firstName: "",
    lastName: "",
    countryCode: 91,
    mobileNumber: "",
    alternateCountryCode: 91,
    alternateNumber: "",
    email: "",
    organisation: "",
    designation: "",
    country: "",
    pincode: "",
    city: "",
    address: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setForm((prev) => ({...prev, [name]: value}));
  };

  const personalFormHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateCurrentStep(2);
  };

  const categoryFormHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateCurrentStep(3);
  };

  return (
    <main className="relative isolate bg-black">
      <div className="relative z-10 flex min-h-svh flex-col px-6 py-7 sm:px-10 sm:py-10 lg:px-[5vw] lg:py-[6.7vh]">
        <header className="flex items-start justify-between">
          <PanchshilMark />
          <FormStages step={currentStep} />
        </header>
        <section className={`flex items-stretch pt-10 gap-20 transition-all duration-300 ease-in-out overflow-hidden ${currentStep !== 1 ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100'}`}>
          <div style={{backgroundImage: `url(${basePath}images/form/step-01.png)`}} className="bg-no-repeat bg-cover bg-center w-2xl relative px-10 py-10">
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="flex flex-col relative h-full">
              <p className="uppercase text-[#b29a75] tracking-[0.2em]">Step 01/Personal</p>
              <div className="mt-auto flex flex-col gap-10">
                <h3 className={`${zapfHumanist601Roman.variable} text-[30px]`}>A consultation begins with knowing you.</h3>
                <p className={`font-open-sans text-base leading-[1.5] text-white/65`}>Your details remain private. They allow our team to prepare a considered, personalised response — the way Panchshil has always served its patrons.</p>
              </div>
            </div>
          </div>
          <form ref={personalFormRef} onSubmit={personalFormHandleSubmit} className="space-y-6 flex flex-col gap-5 w-full font-open-sans tracking-wider text-[#ACAAA3]">
            <div className="flex gap-5 justify-between">
              <div className="flex flex-col gap-3 border-[#4A4D49] border-b-[1px]">
                <label>Title</label>
                <div className="relative">
                  <select name="title" value={form.title} onChange={handleChange} className="appearance-none w-35">
                    <option value="">Select Title</option>
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Miss.</option>
                    <option>Dr.</option>
                    <option>Prof.</option>
                    <option>Col.</option>
                  </select>
                  <SelectTagArrow />
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px]">
                <label>First Name</label>
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px] relative">
                <label>Last Name</label>
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} />
              </div>
            </div>
            <div className="flex gap-5 justify-between">
              <div className="flex flex-col gap-3 w-30 border-[#4A4D49] border-b-[1px]">
                <label>Code</label>
                <div className="relative">
                  <select name="countryCode" value={form.countryCode} onChange={handleChange} className="appearance-none">
                    {
                      countryArray && countryArray.length > 0 && countryArray.map((country, key) => (
                        <option key={key} value={country.phone}>+{country.phone} {country.name}</option>
                      ))
                    }
                  </select>
                  <SelectTagArrow />
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px] relative">
                <label>Mobile Number</label>
                <input type="tel" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-3 w-30 border-[#4A4D49] border-b-[1px]">
                <label>Code</label>
                <div className="relative">
                  <select name="alternateCountryCode" value={form.alternateCountryCode} onChange={handleChange} className="appearance-none">
                    {
                      countryArray && countryArray.length > 0 && countryArray.map((country, key) => (
                        <option key={key} value={country.phone}>+{country.phone} {country.name}</option>
                      ))
                    }
                  </select>
                  <SelectTagArrow />
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px] relative">
                <label>Alternate Number <span className="text-gray-500 text-[10px]">(Optional)</span></label>
                <input type="tel" name="alternateNumber" value={form.alternateNumber} onChange={handleChange} />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px] relative">
              <label>Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div className="flex gap-5 justify-between border-[#4A4D49] border-b-[1px]">
              <div className="flex flex-col gap-3 w-full relative">
                <label>Organisation <span className="text-gray-500 text-[10px]">(Optional)</span></label>
                <input type="text" name="organisation" value={form.organisation} onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px] relative">
                <label>Designation <span className="text-gray-500 text-[10px]">(Optional)</span></label>
                <input type="text" name="designation" value={form.designation} onChange={handleChange} />
              </div>
            </div>
            <div className="flex gap-5 justify-between">
              <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px]">
                <label>Country</label>
                <div className="relative">
                  <select name="country" value={form.country} onChange={handleChange} className="appearance-none">
                    {
                      countryArray && countryArray.length > 0 && countryArray.map((country, key) => (
                        <option key={key} value={country.name}>{country.name}</option>
                      ))
                    }
                  </select>
                  <SelectTagArrow />
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px] relative">
                <label>Pincode</label>
                <input type="text" name="pincode" value={form.pincode} onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px] relative">
                <label>City <span className="text-gray-500 text-[10px]">(Optional)</span></label>
                <input type="text" name="city" value={form.city} onChange={handleChange} />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px] relative">
              <label>Address <span className="text-gray-500 text-[10px]">(Optional)</span></label>
              <input type="text" name="address" value={form.address} onChange={handleChange} />
            </div>
            <div className="flex gap-5 justify-end">
              <button type="submit" className="group inline-flex h-[52px] items-center gap-5 border border-[#9a7951] px-5 text-[15px] text-white transition-colors hover:bg-white/10 sm:h-[58px] sm:px-6 sm:text-[17px] uppercase cursor-pointer">Continue <GoArrowRight size={20} /></button>
            </div>
          </form>
        </section>
        <section className={`flex flex-col pt-10 gap-20 transition-all duration-300 ease-in-out overflow-hidden ${currentStep !== 2 ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100'}`}>
          <div className="flex flex-col gap-5 max-w-[650px]">
            <p className="uppercase text-[#b29a75] tracking-[0.2em]">Step 02/Direction</p>
            <h3 className={`${zapfHumanist601Roman.variable} text-[30px]`}>What draws your attention?</h3>
            <p className={`font-open-sans text-base leading-[1.5] text-white/65`}>Select one or more directions. The remainder of the consultation will adapt quietly to every interest you choose.</p>
          </div>
          <form ref={categoryFormRef} onSubmit={categoryFormHandleSubmit} className="space-y-6 flex flex-col gap-5 w-full font-open-sans tracking-wider text-[#ACAAA3]">
            <div className="flex gap-5 justify-between">
              <Link href={`${basePath}`} className="group flex justify-center items-center gap-5 text-[15px] text-white transition-colors sm:text-[17px] uppercase">
                <GoArrowLeft size={20} /> Back
              </Link>
              <button type="submit" className="group inline-flex h-[52px] items-center gap-5 border border-[#9a7951] px-5 text-[15px] text-white transition-colors hover:bg-white/10 sm:h-[58px] sm:px-6 sm:text-[17px] uppercase cursor-pointer">Continue <GoArrowRight size={20} /></button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
