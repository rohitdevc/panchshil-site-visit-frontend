"use client"

import { PanchshilMark } from "./panchshil-mark";
import { FormStages } from "./form-stages";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { zapfHumanist601Roman } from "@/app/fonts";
import { openSans } from "@/app/fonts";

type PersonalForm = {
  title: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  mobileNumber: string;
  alternateNumber: string;
  email: string;
  organisation: string;
  designation: string;
  country: string;
  pincode: string;
  city: string;
  address: string;
};

export function CustomerFormPage() {
  const basePath = process.env.NEXT_PUBLIC_PATH || "/";

  const [currentStep, updateCurrentStep] = useState(1);

  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<PersonalForm>({
    title: "",
    firstName: "",
    lastName: "",
    countryCode: "+91",
    mobileNumber: "",
    alternateNumber: "",
    email: "",
    organisation: "",
    designation: "",
    country: "India",
    pincode: "",
    city: "",
    address: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setForm((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };

  return (
    <main className="relative isolate bg-black">
      <div className="relative z-10 flex min-h-svh flex-col px-6 py-7 sm:px-10 sm:py-10 lg:px-[10.4vw] lg:py-[6.7vh]">
        <header className="flex items-start justify-between">
          <PanchshilMark />
          <FormStages step={currentStep} />
        </header>
        <section className="flex justify-between items-stretch">
          <div style={{backgroundImage: `url(${basePath}images/form/step-01.png)`}} className="bg-no-repeat bg-cover bg-right w-xl relative px-10 py-10">
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="flex flex-col relative">
              <p className="uppercase text-[#b29a75] tracking-[0.2em]">Step 01/Personal</p>
              <div className="mt-auto flex flex-col gap-10">
                <h3 className={`${zapfHumanist601Roman.variable} text-[40px]`}>A consultation begins with knowing you.</h3>
                <p className={`${openSans.variable} text-lg leading-[1.5] text-white/65`}>Your details remain private. They allow our team to prepare a considered, personalised response — the way Panchshil has always served its patrons.</p>
              </div>
            </div>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label>Title</label>
              <select name="title" value={form.title} onChange={handleChange}>
                <option value="">Select Title</option>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Miss.</option>
                <option>Dr.</option>
                <option>Prof.</option>
                <option>Col.</option>
              </select>
            </div>
            <div>
              <label>First Name</label>
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
            </div>

      {/* Last Name */}
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
        />
      </div>

      {/* Country Code */}
      <div>
        <label>Country Code</label>
        <input
          type="text"
          name="countryCode"
          value={form.countryCode}
          onChange={handleChange}
        />
      </div>

      {/* Mobile */}
      <div>
        <label>Mobile Number</label>
        <input
          type="tel"
          name="mobileNumber"
          value={form.mobileNumber}
          onChange={handleChange}
        />
      </div>

      {/* Alternate */}
      <div>
        <label>Alternate Number</label>
        <input
          type="tel"
          name="alternateNumber"
          value={form.alternateNumber}
          onChange={handleChange}
        />
      </div>

      {/* Email */}
      <div>
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      {/* Organisation */}
      <div>
        <label>Organisation</label>
        <input
          type="text"
          name="organisation"
          value={form.organisation}
          onChange={handleChange}
        />
      </div>

      {/* Designation */}
      <div>
        <label>Designation</label>
        <input
          type="text"
          name="designation"
          value={form.designation}
          onChange={handleChange}
        />
      </div>

      {/* Country */}
      <div>
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
        />
      </div>

      {/* Pincode */}
      <div>
        <label>Pincode</label>
        <input
          type="text"
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
        />
      </div>

      {/* City */}
      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
        />
      </div>

      {/* Address */}
      <div>
        <label>Address</label>
        <textarea
          name="address"
          rows={4}
          value={form.address}
          onChange={handleChange}
        />
      </div>

      <button type="submit">
        Continue
      </button>
    </form>
        </section>
      </div>
    </main>
  );
}
