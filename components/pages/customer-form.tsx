"use client"

import { PanchshilMark } from "../panchshil-mark";
import { FormStages } from "../form-stages";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { isEmail, isEmpty, isMobilePhone, isLength } from 'validator';
import { countries } from 'countries-list'
import SelectTagArrow from "../select-tag-arrow";
import BottomNav from "../bottomNav";
import LineBreak from "../LineBreak";
import PreviewBlock from "../PreviewBlock";
import ErrorSpan from "../ErrorSpan";
import { CustomerFormErrors, PersonalForm, PropertyForm, CategoryForm, ConfigurationForm } from "@/types/forms";
import { PropertyDataProps } from "@/types/api";
import { getIndiaPincode } from 'india-pincode/browser'

const countryArray = Object.values(countries)
.map(c => ({
  name: c.name,
  phone: c.phone[0]
})).sort((a, b) => {
  if (a.name === "India") return -1;
  if (b.name === "India") return 1;
  return a.name.localeCompare(b.name);
});

type PageProps = {
  property_categories: PropertyDataProps[]
  investment_timelines: string[]
}

export function CustomerFormPage({property_categories, investment_timelines}: PageProps) {
  const basePath = process.env.NEXT_PUBLIC_PATH || "/";

  const [showLoader, updateLoader] = useState(false);

  const [ip, setIp] = useState("");
  const [errors, setErrors] = useState<CustomerFormErrors>({});

  const [currentStep, updateCurrentStep] = useState(1);

  const searchPinCode = async (pinCode: string) => {
    try {
      const pin = await getIndiaPincode();
      const res = pin.getByPincode(pinCode);
      
      if(res.data && res.data.data && res.data.data.length > 0) {
        return res.data.data[0].district;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
};

  const personalFormRef = useRef<HTMLFormElement>(null);
  const categoryFormRef = useRef<HTMLFormElement>(null);
  const propertyFormRef = useRef<HTMLFormElement>(null);
  const configurationFormRef = useRef<HTMLFormElement>(null);
  const previewFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
      async function getIp() {
        const res = await fetch("/api/ip");
        const data = await res.json();
        setIp(data.ip);
      }
  
      getIp();
  }, []);

  const initialPersonalForm = {
    title: "",
    firstName: "",
    lastName: "",
    countryCode: 91,
    mobileNumber: "",
    alternateCountryCode: 91,
    alternateNumber: "",
    email: "",
    organization: "",
    designation: "",
    country: "India",
    pincode: "",
    city: "",
    address: "",
  }

  const initialCategoryForm = {
    categoryName: ""
  }

  const initialPropertyForm = {
    propertyName: "",
    propertyLocation: ""
  }

  const initialConfigurationForm = {
    configurationName: "",
    intentedUse: "",
    investmentTimeline: ""
  }

  const [personalForm, setPersonalForm] = useState<PersonalForm>(initialPersonalForm);

  const [categoryForm, setCategoryForm] = useState<CategoryForm>(initialCategoryForm);

  const [propertyForm, setPropertyForm] = useState<PropertyForm>(initialPropertyForm);

  const [configurationForm, setConfigurationForm] = useState<ConfigurationForm>(initialConfigurationForm);

  const [propertyCategoryKey, setPropertyCategoryKey] = useState(-1);

  const [propertyKey, setPropertyKey] = useState(-1);

  const propertyCategory = property_categories[propertyCategoryKey];

  const property = propertyCategory?.properties[propertyKey];

  const handleChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setPersonalForm((prev) => ({...prev, [name]: value}));
    setConfigurationForm((prev) => ({...prev, [name]: value}));
    setErrors(prev => ({ ...prev, [name]: undefined}));
  }

  const findCityName = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if(name === "pincode" && value.length === 6 && personalForm.country === "India") {
      const cityName = await searchPinCode(value);

      if(cityName) {
        setPersonalForm((prev) => ({...prev, city: cityName}));
      }
    }
  }

  const handleCategorySelect = (key: number) => {
    setPropertyCategoryKey(key);
    setCategoryForm((prev) => ({
      categoryName: property_categories[key].property_category_name,
    }));

    updateCurrentStep(3);
  }

  const handlePropertySelect = (key: number) => {
    setPropertyKey(key);
    setPropertyForm((prev) => ({
      propertyName: propertyCategory.properties[key].property_name,
      propertyLocation: propertyCategory.properties[key]?.property_location
    }));

    updateCurrentStep(4);
  }

  const handleConfigurationChange = (configuration: string) => {
    setConfigurationForm((prev) => ({...prev, configurationName: configuration}));
    setErrors(prev => ({ ...prev, configurationName: undefined}));
  }

  const handleIntendedUseChange = (intent_use: string) => {
    setConfigurationForm((prev) => ({...prev, intentedUse: intent_use}));
    setErrors(prev => ({ ...prev, intentedUse: undefined}));
  }

  const titleRef = useRef<HTMLSelectElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const countryCodeRef = useRef<HTMLSelectElement | null>(null);  
  const mobileNumberRef = useRef<HTMLInputElement | null>(null);
  const alternateCountryCodeRef = useRef<HTMLSelectElement | null>(null);
  const alternateNumberRef = useRef<HTMLInputElement | null>(null);
  const emailAddressRef = useRef<HTMLInputElement | null>(null);
  const organizationRef = useRef<HTMLInputElement | null>(null);
  const designationRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLSelectElement | null>(null);
  const pinCodeRef = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const timelineRef = useRef<HTMLSelectElement | null>(null);

  /*
  const refMap: Record<string, React.RefObject<HTMLInputElement | HTMLSelectElement | null>> = {
    title: titleRef,
    firstName: firstNameRef,
    lastName: lastNameRef,
    countryCode: countryCodeRef,
    mobileNumber: mobileNumberRef,
    alternateCountryCode: alternateCountryCodeRef,
    alternateNumber: alternateNumberRef,
    email: emailAddressRef,
    organization: organizationRef,
    designation: designationRef,
    country: countryRef,
    pincode: pinCodeRef,
    city: cityRef,
    address: addressRef,
    investmentTimeline: timelineRef
  }; */

  const runPersonalFormErrorCheck = () => {
    let response = false;

    if(isEmpty(personalForm.title)) {
      setErrors({title: 'Please select a title'});
      titleRef.current?.focus();
      return response;
    }

    if(isEmpty(personalForm.firstName)) {
      setErrors({firstName: 'Please enter your first name'});
      firstNameRef.current?.focus();
      return response;
    }

    if(isEmpty(personalForm.lastName)) {
      setErrors({lastName: 'Please enter your last name'});
      lastNameRef.current?.focus();
      return response;
    }

    if(isEmpty(personalForm.mobileNumber)) {
      setErrors({mobileNumber: 'Please enter your mobile number'});
      mobileNumberRef.current?.focus();
      return response;
    } else if(!isMobilePhone(`${personalForm.countryCode}${personalForm.mobileNumber}`, 'any')) {
      setErrors({mobileNumber: 'Please enter a valid mobile number'});
      mobileNumberRef.current?.focus();
      return response;
    }

    if(!isEmpty(personalForm.alternateNumber) && !isMobilePhone(`${personalForm.alternateCountryCode}${personalForm.alternateNumber}`, 'any')) {
      setErrors({alternateNumber: 'Please enter a valid mobile number'});
      alternateNumberRef.current?.focus();
      return response;
    }

    if(isEmpty(personalForm.email)) {
      setErrors({email: 'Please enter your email address'});
      emailAddressRef.current?.focus();
      return response;
    } else if(!isEmail(personalForm.email)) {
      setErrors({email: 'Please enter a valid email address'});
      emailAddressRef.current?.focus();
      return response;
    }

    if(isEmpty(personalForm.pincode)) {
      setErrors({pincode: 'Please enter your PIN code'});
      pinCodeRef.current?.focus();
      return response;
    }

    response = true;

    return response;
  }

  const runCategoryFormErrorCheck = () => {
    let response = false;

    if(isEmpty(categoryForm.categoryName)) {
      alert("Please select a category")
      return response;
    }

    response = true;

    return response;
  }

  const runPropertyFormErrorCheck = () => {
    let response = false;

    if(isEmpty(propertyForm.propertyName)) {
      alert("Please select a property");
      return response;
    }

    response = true;

    return response;
  }

  const runConfigurationFormErrorCheck = () => {
    let response = false;

    if(isEmpty(configurationForm.configurationName)) {
      setErrors({configurationName: 'Please select a configuration'});
      return response;
    }

    if(isEmpty(configurationForm.intentedUse)) {
      setErrors({intentedUse: 'Please select your intended use'});
      return response;
    }

    response = true;

    return response;
  }

  const personalFormHandleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!runPersonalFormErrorCheck()) {
      return false;
    }

    updateCurrentStep(2);
  };

  const categoryFormHandleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!runCategoryFormErrorCheck()) {
      return false;
    }

    updateCurrentStep(3);
  };

  const propertyFormHandleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!runPropertyFormErrorCheck()) {
      return false;
    }

    updateCurrentStep(4);
  };

  const configurationFormHandleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!runConfigurationFormErrorCheck()) {
      return false;
    }

    updateCurrentStep(5);
  };

  const previewFormHandleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!runPersonalFormErrorCheck()) {
      return false;
    }

    if(!runCategoryFormErrorCheck()) {
      return false;
    }

    if(!runPropertyFormErrorCheck()) {
      return false;
    }

    if(!runConfigurationFormErrorCheck()) {
      return false;
    }

    updateLoader(true);

    await new Promise((resolve) => requestAnimationFrame(resolve));

    try {
      const payload = {
        customer_title: personalForm.title,
        customer_full_name: personalForm.firstName + ' ' + personalForm.lastName,
        customer_mobile_number: '+' + personalForm.countryCode + personalForm.mobileNumber,
        customer_alternate_number: personalForm.alternateNumber ? '+' + personalForm.alternateCountryCode + personalForm.alternateNumber : null,
        customer_email_address: personalForm.email,
        customer_organization_name: personalForm.organization,
        customer_designation: personalForm.designation,
        customer_country_name: personalForm.country,
        customer_pin_code: personalForm.pincode,
        customer_city_name: personalForm.city,
        customer_address: personalForm.address,
        customer_property_category_name: categoryForm.categoryName,
        customer_property_name: propertyForm.propertyName,
        customer_property_configuration: configurationForm.configurationName,
        customer_property_intent: configurationForm.intentedUse,
        customer_property_investment_timeline: configurationForm.investmentTimeline,
        ip_address: ip,
        referer_url: window.location.href
      };

      const response = await fetch("api/customer-form", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        const err = await response.json();

        if(err.error) {
          let error_response = JSON.parse(err.error);

          if(typeof error_response === "object" && error_response !== null && !Array.isArray(error_response)) {
            error_response = Object.values(error_response);

            const { path, msg } = error_response[0][0];

            const error_message = msg;

            alert(error_message);
          }

          return false;
        }
      }

      const data = await response.json();

      if(data.success) {
        setPersonalForm(initialPersonalForm);
        setPropertyCategoryKey(-1);
        setCategoryForm(initialCategoryForm);
        setPropertyKey(-1);
        setPropertyForm(initialPropertyForm);
        setConfigurationForm(initialConfigurationForm);

        if(!data.result) return false;

        window.location.href = 'thank-you';
      }
    } catch(error) {
      console.error(error);
    } finally {
      updateLoader(false);
    }
  };

  const [displayStep, setDisplayStep] = useState(currentStep);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (currentStep !== displayStep) {
      setFading(true);

      const timeout = setTimeout(() => {
        setDisplayStep(currentStep);
        setFading(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [currentStep]);

  return (
    <main className="relative isolate bg-black">
    <div className={`h-full w-full fixed top-0 left-0 z-15 cursor-wait bg-center bg-no-repeat bg-white opacity-50 ${showLoader === false ? 'hidden': ''}`} style={{backgroundImage: `url(images/img_loader.gif)`}}></div>
      <div className="relative z-10 flex flex-col px-6 py-7 sm:px-10 sm:py-10 lg:px-[5vw] lg:py-[6.7vh]">
        <header className="flex flex-col lg:flex-row items-start gap-5 lg:justify-between">
          <PanchshilMark />
          <FormStages step={currentStep} />
        </header>
        {
          displayStep === 1 && (
          <section className={`flex flex-col lg:flex-row lg:items-stretch pt-10 gap-10 xl:gap-20 transition-all duration-300 ease-in-out overflow-hidden ${fading ? "opacity-0" : "opacity-100"}`}>
            <div style={{backgroundImage: `url(images/form/step-01.png)`}} className="bg-no-repeat bg-cover bg-center w-full lg:w-2xl relative p-5 lg:p-10">
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="flex flex-col relative h-full min-h-60">
                <p className="uppercase text-[#b29a75] tracking-[0.2em]">Step 01 / Personal</p>
                <div className="mt-auto flex flex-col gap-5 lg:gap-10">
                  <h3 className={`font-zapf-regular text-lg lg:text-[30px]`}>A consultation begins with knowing you.</h3>
                  <p className={` text-base leading-[1.5] text-white/65`}>Your details remain private. They allow our team to prepare a considered, personalised response — the way Panchshil has always served its patrons.</p>
                </div>
              </div>
            </div>
            <form ref={personalFormRef} onSubmit={personalFormHandleSubmit} className="flex flex-col gap-5 w-full tracking-wider text-[#ACAAA3]" autoComplete="off">
              <div className="flex flex-col lg:flex-row gap-5 lg:justify-between">
                <div className="flex flex-col gap-3 relative">
                  <label>Title</label>
                  <div className="relative">
                    <select name="title" value={personalForm.title} onChange={handleChange} className="appearance-none w-full lg:!w-35" ref={titleRef}>
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
                  <ErrorSpan error_message={errors.title} />
                </div>
                <div className="flex flex-col gap-3 w-full relative">
                  <label>First Name</label>
                  <input type="text" name="firstName" value={personalForm.firstName} onChange={handleChange} ref={firstNameRef} />
                  <ErrorSpan error_message={errors.firstName} />
                </div>
                <div className="flex flex-col gap-3 w-full relative">
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={personalForm.lastName} onChange={handleChange} ref={lastNameRef} />
                  <ErrorSpan error_message={errors.lastName} />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-5 lg:justify-between">
                <div className="flex flex-col gap-3 w-full lg:w-30 relative">
                  <label>Code</label>
                  <div className="relative">
                    <select name="countryCode" value={personalForm.countryCode} onChange={handleChange} className="appearance-none w-full lg:!w-35" ref={countryCodeRef}>
                      {
                        countryArray && countryArray.length > 0 && countryArray.map((country, key) => (
                          <option key={key} value={country.phone}>+{country.phone} {country.name}</option>
                        ))
                      }
                    </select>
                    <SelectTagArrow />
                  </div>
                  <ErrorSpan error_message={errors.countryCode} />
                </div>
                <div className="flex flex-col gap-3 w-full relative">
                  <label>Mobile Number</label>
                  <input type="tel" name="mobileNumber" value={personalForm.mobileNumber} onChange={handleChange} inputMode="numeric" ref={mobileNumberRef} />
                  <ErrorSpan error_message={errors.mobileNumber} />
                </div>
                <div className="flex flex-col gap-3 w-full lg:w-30 relative">
                  <label>Code</label>
                  <div className="relative">
                    <select name="alternateCountryCode" value={personalForm.alternateCountryCode} onChange={handleChange} className="appearance-none w-full lg:!w-35" ref={alternateCountryCodeRef}>
                      {
                        countryArray && countryArray.length > 0 && countryArray.map((country, key) => (
                          <option key={key} value={country.phone}>+{country.phone} {country.name}</option>
                        ))
                      }
                    </select>
                    <SelectTagArrow />
                  </div>
                  <ErrorSpan error_message={errors.alternateCountryCode} />
                </div>
                <div className="flex flex-col gap-3 w-full relative">
                  <label>Alternate Number <span className="text-gray-500 text-[10px]">(Optional)</span></label>
                  <input type="tel" name="alternateNumber" value={personalForm.alternateNumber} onChange={handleChange} inputMode="numeric" ref={alternateNumberRef} />
                  <ErrorSpan error_message={errors.alternateNumber} />
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full relative">
                <label>Email Address</label>
                <input type="email" name="email" value={personalForm.email} onChange={handleChange} ref={emailAddressRef} />
                <ErrorSpan error_message={errors.email} />
              </div>
              <div className="flex flex-col lg:flex-row gap-5 lg:justify-between">
                <div className="flex flex-col gap-3 w-full relative">
                  <label>Organization <span className="text-gray-500 text-[10px]">(Optional)</span></label>
                  <input type="text" name="organization" value={personalForm.organization} onChange={handleChange} ref={organizationRef} />
                  <ErrorSpan error_message={errors.organization} />
                </div>
                <div className="flex flex-col gap-3 w-full relative">
                  <label>Designation <span className="text-gray-500 text-[10px]">(Optional)</span></label>
                  <input type="text" name="designation" value={personalForm.designation} onChange={handleChange} ref={designationRef} />
                  <ErrorSpan error_message={errors.designation} />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-5 lg:justify-between">
                <div className="flex flex-col gap-3 w-full">
                  <label>Country</label>
                  <div className="relative">
                    <select name="country" value={personalForm.country} onChange={handleChange} className="appearance-none" ref={countryRef}>
                      {
                        countryArray && countryArray.length > 0 && countryArray.map((country, key) => (
                          <option key={key} value={country.name}>{country.name}</option>
                        ))
                      }
                    </select>
                    <SelectTagArrow />
                    <ErrorSpan error_message={errors.country} />
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full relative">
                  <label>Pincode</label>
                  <input type="text" name="pincode" value={personalForm.pincode} onChange={handleChange} onBlur={findCityName} ref={pinCodeRef} />
                  <ErrorSpan error_message={errors.pincode} />
                </div>
                <div className="flex flex-col gap-3 w-full relative">
                  <label>City <span className="text-gray-500 text-[10px]">(Optional)</span></label>
                  <input type="text" name="city" value={personalForm.city} onChange={handleChange} ref={cityRef} />
                  <ErrorSpan error_message={errors.city} />
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full relative">
                <label>Address <span className="text-gray-500 text-[10px]">(Optional)</span></label>
                <input type="text" name="address" value={personalForm.address} onChange={handleChange} ref={addressRef} />
                <ErrorSpan error_message={errors.address} />
              </div>
              <BottomNav step={0} updateCurrentStep={updateCurrentStep} />
            </form>
          </section>
        )
        }
        {
          displayStep === 2 && (
          <section className={`flex flex-col pt-10 gap-20 transition-all duration-300 ease-in-out ${fading ? "opacity-0" : "opacity-100"}`}>
            <div className="flex flex-col gap-5 max-w-[650px]">
              <p className="uppercase text-[#b29a75] tracking-[0.2em]">Step 02 / Direction</p>
              <h3 className={`font-zapf-regular text-[30px]`}>What draws your attention?</h3>
              <p className={` text-base leading-[1.5] text-white/65`}>Select one or more directions. The remainder of the consultation will adapt quietly to every interest you choose.</p>
            </div>
            <form ref={categoryFormRef} onSubmit={categoryFormHandleSubmit} className="flex flex-col gap-5 w-full tracking-wider text-[#ACAAA3]" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {
                  property_categories && property_categories.length > 0 && property_categories.map((property_category, key) => (
                    <div key={key} className={`bg-no-repeat bg-cover w-xs px-7 py-10 h-100 relative cursor-pointer transition-all duration-300 hover:border border-[#9E8C70] hover:shadow-[inset_0px_0px_0px_0px_#9E8C7080,_0px_20px_32px_0px_#9E8C7080,_0px_10px_108.5px_0px_#9E8C7080] ${propertyCategoryKey === key ? 'border border-[#9E8C70] shadow-[inset_0px_0px_0px_0px_#9E8C7080,_0px_20px_32px_0px_#9E8C7080,_0px_10px_108.5px_0px_#9E8C7080]' : '' }`} style={{backgroundImage: `url(${property_category.property_category_thumbnail})`}} onClick={() => (handleCategorySelect(key))}>
                      <div className="absolute inset-0 bg-black/70"></div>
                      <div className={`w-7 h-7 rounded-full border border-[#7B7B7B] border-[1px] absolute right-5 top-5 ${propertyCategoryKey === key ? 'bg-[#9E8C70]' : '' } flex justify-center items-center`}>
                        <Image src={`images/icons/tick.png`} width={12} height={10} alt="Tick" className={`w-[10px] h-[7.55px] ${propertyCategoryKey !== key ? 'hidden' : ''}`} />
                      </div>
                      <div className="flex flex-col relative h-full">
                        <p className="uppercase text-[#b29a75] tracking-[0.2em]">{property_category.property_category_caption}</p>
                        <div className="mt-auto flex flex-col gap-5">
                          <h3 className={`font-zapf-regular text-[28px] text-white`}>{property_category.property_category_name}</h3>
                          <p className={` text-base leading-[1.5] text-white/65`}>{property_category.property_category_description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <BottomNav step={1} updateCurrentStep={updateCurrentStep} />
            </form>
          </section>
          )
        }
        {
          displayStep === 3 && propertyCategory && (
          <section className={`flex flex-col pt-10 gap-10 transition-all duration-300 ease-in-out ${fading ? "opacity-0" : "opacity-100"}`}>
            <div className="flex flex-col gap-5 max-w-[650px]">
              <p className="uppercase text-[#b29a75] tracking-[0.2em]">Step 03 / Curated Selection</p>
              <h3 className={`font-zapf-regular text-[30px]`}>Choose the developments that interest you.</h3>
              <p className={` text-base leading-[1.5] text-white/65`}>Select any number of addresses across your chosen directions — each will be tailored individually in the next step.</p>
            </div>
            <form ref={propertyFormRef} onSubmit={propertyFormHandleSubmit} className="flex flex-col gap-5 w-full tracking-wider text-[#ACAAA3]" autoComplete="off">
              <p className="uppercase text-[#b29a75] tracking-[0.2em]">{propertyCategory.property_category_caption}</p>
              <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                <h3 className={`font-zapf-regular text-[30px]`}>{propertyCategory.property_category_name}</h3>
                <span className=" uppercase">{propertyCategory.properties.length} {propertyCategory.properties.length === 1 ? 'address' : 'addresses' }</span>
              </div>
              <hr />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                {
                  propertyCategory.properties && propertyCategory.properties.length > 0 && propertyCategory.properties.map((property, key) => (
                    <div key={key} className={`bg-no-repeat bg-cover w-full px-7 py-7 h-100 relative flex items-end cursor-pointer transition-all duration-300 hover:border border-[#9E8C70] hover:shadow-[inset_0px_0px_0px_0px_#9E8C7080,_0px_20px_32px_0px_#9E8C7080,_0px_10px_108.5px_0px_#9E8C7080] ${propertyKey === key ? 'border border-[#9E8C70] shadow-[inset_0px_0px_0px_0px_#9E8C7080,_0px_20px_32px_0px_#9E8C7080,_0px_10px_108.5px_0px_#9E8C7080]' : '' }`} style={{backgroundImage: `url(${property.property_thumbnail})`}} onClick={() => (handlePropertySelect(key))}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className={`w-7 h-7 rounded-full border border-[#7B7B7B] border-[1px] absolute right-5 top-5 ${propertyKey === key ? 'bg-[#9E8C70]' : '' } flex justify-center items-center`}>
                        <Image src={`images/icons/tick.png`} width={12} height={10} alt="Tick" className={`w-[10px] h-[7.55px] ${propertyKey !== key ? 'hidden' : ''}`} />
                      </div>
                      <div className="flex flex-col gap-2 text-white relative">
                          <h4 className="uppercase text-sm">{property.property_location}</h4>
                          <h3 className={`font-zapf-regular text-[24px]`}>{property.property_name}</h3>
                          <p className={` text-base leading-[1.5]`}>{property.property_description}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
              <BottomNav step={2} updateCurrentStep={updateCurrentStep} />
            </form>
          </section>
        )
        }
        {
          displayStep === 4 && propertyCategory && property && (
          <section className={`flex flex-col pt-10 gap-10 transition-all duration-300 ease-in-out ${fading ? "opacity-0" : "opacity-100"}`}>
            <div className="flex flex-col gap-5 max-w-[650px]">
              <p className="uppercase text-[#b29a75] tracking-[0.2em]">Step 04 / Configuration</p>
              <h3 className={`font-zapf-regular text-[30px]`}>Tailor each address individually.</h3>
              <p className={` text-base leading-[1.5] text-white/65`}>Step through every selected development. Each can be refined to a different scale, configuration, and intent.</p>
            </div>
            <form ref={configurationFormRef} onSubmit={configurationFormHandleSubmit} className="flex flex-col gap-5 w-full tracking-wider text-[#ACAAA3]" autoComplete="off">
              <p className="uppercase text-[#b29a75] tracking-[0.2em]">{propertyCategory.property_category_caption}</p>
              <h3 className={`font-zapf-regular text-[30px]`}>{property.property_name}</h3>
              <span className="text-gray-500 text-sm">{property.property_location}</span>
              <hr />
              <p className="uppercase text-[#b29a75] tracking-[0.2em] mt-10">Configurations</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 text-white relative">
                {
                  property.property_configurations && property.property_configurations.length > 0 && property.property_configurations.map((configuration, key) => (
                    <div className={`w-full border px-6 py-10 cursor-pointer transition-all duration-300 hover:border-[#ACAAA3] hover:border-[2px] hover:bg-[#20202066] ${configuration === configurationForm.configurationName ? 'border-[#ACAAA3] border-[2px] bg-[#20202066]' : 'border-[#4A4D49]' }`} key={key} onClick={() => handleConfigurationChange(configuration)}>{configuration}</div>
                  ))
                }
                <ErrorSpan error_message={errors.configurationName} />
              </div>
              <p className="uppercase text-[#b29a75] tracking-[0.2em] mt-10">Intended Use</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 text-white relative">
                {
                  propertyCategory.property_category_intended_uses && propertyCategory.property_category_intended_uses.length > 0 && propertyCategory.property_category_intended_uses.map((intent_use, key) => (
                    <div className={`w-full border px-6 py-10 cursor-pointer transition-all duration-300 hover:border-[#ACAAA3] hover:border-[2px] hover:bg-[#20202066] ${intent_use === configurationForm.intentedUse ? 'border-[#ACAAA3] border-[2px] bg-[#20202066]' : 'border-[#4A4D49]' }`} key={key} onClick={() => handleIntendedUseChange(intent_use)}>{intent_use}</div>
                  ))
                }
                <ErrorSpan error_message={errors.intentedUse} />
              </div>
              <div className="flex flex-col gap-3 w-full lg:w-1/2 mt-10">
                <label>Investment Timeline <span className="text-gray-500 text-[10px]">Optional</span></label>
                <div className="relative">
                  <select name="investmentTimeline" value={configurationForm.investmentTimeline} onChange={handleChange} className="appearance-none" ref={timelineRef}>
                    <option value="">-</option>
                    {
                      investment_timelines && investment_timelines.length > 0 && investment_timelines.map((investment_timeline, key) => (
                        <option value={investment_timeline} key={key}>{investment_timeline}</option>
                      ))
                    }
                  </select>
                  <SelectTagArrow />
                </div>
                <ErrorSpan error_message={errors.investmentTimeline} />
              </div>
              <BottomNav step={3} updateCurrentStep={updateCurrentStep} />
            </form>
          </section>
        )
        }
        {
          displayStep === 5 && (
          <form ref={previewFormRef} className={`flex flex-col pt-10 gap-10 transition-all duration-300 ease-in-out ${fading ? "opacity-0" : "opacity-100"}`} onSubmit={previewFormHandleSubmit} autoComplete="off">
            <div className="flex flex-col gap-5 max-w-[650px]">
              <p className="uppercase text-[#b29a75] tracking-[0.2em]">Step 05 / Review</p>
              <h3 className={`font-zapf-regular text-[30px]`}>A quiet review before we begin.</h3>
              <p className={` text-base leading-[1.5] text-white/65`}>Edit any section. Submit when ready — a Panchshil representative will reach out personally.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm lg:text-base">
              <div className="border border-[#232323] p-5 lg:p-10 flex flex-col gap-5">
                <div className="flex justify-between">
                  <h2 className={`font-zapf-regular text-[25px] lg:text-[32px]`}>Personal</h2>
                  <button className="cursor-pointer uppercase text-[#b29a75] tracking-[0.2em]" onClick={() => updateCurrentStep(1)}>Edit</button>
                </div>
                <LineBreak />
                <PreviewBlock section_heading="Name" section_value={`${personalForm.title} ${personalForm.firstName} ${personalForm.lastName}`} />
                <PreviewBlock section_heading="Mobile" section_value={`+${personalForm.countryCode} ${personalForm.mobileNumber}`} />
                <PreviewBlock section_heading="Alternate Mobile" section_value={`${personalForm.alternateNumber ? `+${personalForm.alternateCountryCode} ${personalForm.alternateNumber}` : ''}`} />
                <PreviewBlock section_heading="Email Address" section_value={`${personalForm.email}`} />
                <PreviewBlock section_heading="Organization" section_value={`${personalForm.organization}`} />
                <PreviewBlock section_heading="Designation" section_value={`${personalForm.designation}`} />
                <PreviewBlock section_heading="Country" section_value={`${personalForm.country}`} />
                <PreviewBlock section_heading="PIN Code" section_value={`${personalForm.pincode}`} />
                <PreviewBlock section_heading="City" section_value={`${personalForm.city}`} />
                <PreviewBlock section_heading="Address" section_value={`${personalForm.address}`} />
              </div>
              <div className="border border-[#232323] p-5 lg:p-10 flex flex-col gap-5">
                <div className="flex justify-between">
                  <h2 className={`font-zapf-regular text-[25px] lg:text-[32px]`}>Direction</h2>
                  <button className="cursor-pointer uppercase text-[#b29a75] tracking-[0.2em]" onClick={() => updateCurrentStep(2)}>Edit</button>
                </div>
                <PreviewBlock section_heading="Category" section_value={`${categoryForm.categoryName}`} />
                <PreviewBlock section_heading="Property" section_value={`${propertyForm.propertyName}`} />
              </div>
              <div className="border border-[#232323] p-5 lg:p-10 flex flex-col gap-5">
                <div className="flex justify-between">
                  <h2 className={`font-zapf-regular text-[25px] lg:text-[32px]`}>{propertyForm.propertyName}</h2>
                  <button className="cursor-pointer uppercase text-[#b29a75] tracking-[0.2em]" onClick={() => updateCurrentStep(3)}>Edit</button>
                </div>

                <PreviewBlock section_heading="Category" section_value={`${categoryForm.categoryName}`} />
                <PreviewBlock section_heading="Location" section_value={`${propertyForm.propertyLocation}`} />
                <PreviewBlock section_heading="Configuration" section_value={`${configurationForm.configurationName}`} />
                <PreviewBlock section_heading="Intended Use" section_value={`${configurationForm.intentedUse}`} />
                <PreviewBlock section_heading="Timeline" section_value={`${configurationForm.investmentTimeline}`} />
              </div>
            </div>
            <div className="border border-[#232323] p-5 lg:p-10 flex flex-col gap-5 w-full">
              <h2 className={`font-zapf-regular text-[25px] lg:text-[32px]`}>Consent</h2>
              <p className=" text-white text-[16px]">By confirming, you agree to be contacted by a Panchshil representative regarding your enquiry. Your details remain confidential.</p>
            </div>
            <BottomNav step={4} updateCurrentStep={updateCurrentStep} />
          </form>
        )
        }
      </div>
    </main>
  );
}
