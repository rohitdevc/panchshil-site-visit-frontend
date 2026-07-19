"use client"

import { PanchshilMark } from "./panchshil-mark";
import { FormStages } from "./form-stages";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { zapfHumanist601Roman } from "@/app/fonts";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { countries } from 'countries-list'
import SelectTagArrow from "./select-tag-arrow";
import BottomNav from "./bottomNav";

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

type CategoryForm = {
  categoryName: string;
}

type PropertyForm = {
  propertyName: string;
}

type ConfigurationForm = {
  configurationName: string;
  intentedUse: string;
  investmentTimeline: string;
}

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

  const [currentStep, updateCurrentStep] = useState(5);

  const personalFormRef = useRef<HTMLFormElement>(null);
  const categoryFormRef = useRef<HTMLFormElement>(null);
  const propertyFormRef = useRef<HTMLFormElement>(null);
  const configurationFormRef = useRef<HTMLFormElement>(null);

  const [personalForm, setPersonalForm] = useState<PersonalForm>({
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

  const [categoryForm, setCategoryForm] = useState<CategoryForm>({
    categoryName: ""
  })

  const [propertyForm, setPropertyForm] = useState<PropertyForm>({
    propertyName: ""
  })

  const [configurationForm, setConfigurationForm] = useState<ConfigurationForm>({
    configurationName: "",
    intentedUse: "",
    investmentTimeline: ""
  })

  const [propertyCategoryKey, setPropertyCategoryKey] = useState(0);

  const [propertyKey, setPropertyKey] = useState(0);

  const property_categories = [
    {
      "property_category_name": "Residential",
      "property_category_caption": "Private Residences",
      "property_category_description": "Villas, towers and curated homes designed around light, privacy and considered living.",
      "property_category_thumbnail": "/properties/residential-489447835.webp",
      "property_category_intended_uses": [
        "Self Occupancy",
        "Investment",
        "Rental"
      ],
      "properties": [
        {
          "property_name": "YOOVillas",
          "property_location": "Kharadi, Pune",
          "property_description": "Limited collection of designer villas with private landscapes.",
          "property_thumbnail": "/property/yoo-villas-531202201.webp",
          "property_configurations": [
            "4.5 BHK"
          ]
        },
        {
          "property_name": "Trump Towers",
          "property_location": "Kalyani Nagar, Pune",
          "property_description": "Iconic residences with skyline-facing interiors and concierge living.",
          "property_thumbnail": "/property/trump-towers-281926969.webp",
          "property_configurations": [
            "4.5 BHK"
          ]
        },
        {
          "property_name": "YOOPune",
          "property_location": "Hadapsar, Pune",
          "property_description": "Designer homes interpreted through a contemporary residential language.",
          "property_thumbnail": "/property/yoo-pune-560118467.webp",
          "property_configurations": []
        }
      ]
    },
    {
      "property_category_name": "Office Parks",
      "property_category_caption": "Workplace",
      "property_category_description": "Business environments with architectural integrity and refined common ground.",
      "property_category_thumbnail": "/properties/office-parks-163002376.webp",
      "property_category_intended_uses": [
        "Office",
        "Retail Shop",
        "Restaurant / Café"
      ],
      "properties": [
        {
          "property_name": "Panchshil Avenue",
          "property_location": "Viman Nagar, Pune",
          "property_description": "A grade-A workplace district arranged around landscaped courtyards.",
          "property_thumbnail": "/property/panchshil-avenue-954260254.webp",
          "property_configurations": []
        },
        {
          "property_name": "Golden Bell Plaza",
          "property_location": "Koregaon Park, Pune",
          "property_description": "A boutique commercial address favoured by global brands.",
          "property_thumbnail": "/property/golden-bell-plaza-416169413.webp",
          "property_configurations": []
        }
      ]
    },
    {
      "property_category_name": "Plots",
      "property_category_caption": "Land Parcels",
      "property_category_description": "Strategic land holdings within master-planned, future-facing developments.",
      "property_category_thumbnail": "/properties/plots-575226281.webp",
      "property_category_intended_uses": [
        "Residential Development",
        "Commercial Development",
        "Agricultural Use"
      ],
      "properties": [
        {
          "property_name": "Villa Land Parcels",
          "property_location": "Mulshi Valley",
          "property_description": "Curated parcels within a guarded, master-planned valley estate.",
          "property_thumbnail": "/property/villa-land-parcels-410208221.webp",
          "property_configurations": [
            "10,000 – 20,000 sq ft"
          ]
        }
      ]
    },
    {
      "property_category_name": "Hospitality",
      "property_category_caption": "Landmark & Other",
      "property_category_description": "Hotels, retail and landmark developments shaped by experience and atmosphere.",
      "property_category_thumbnail": "/properties/hospitality-111429650.webp",
      "property_category_intended_uses": [],
      "properties": [
        {
          "property_name": "The Ritz-Carlton, Pune",
          "property_location": "Golf Course Avenue",
          "property_description": "A landmark hospitality address operated to global standards.",
          "property_thumbnail": "/property/the-ritz-carlton-pune-928278199.webp",
          "property_configurations": [
            "Suite Residence",
            "Branded Apartment"
          ]
        }
      ]
    }
  ]

  const propertyCategory = property_categories[propertyCategoryKey];

  const property = propertyCategory?.properties[propertyKey];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setPersonalForm((prev) => ({...prev, [name]: value}));
    setConfigurationForm((prev) => ({...prev, [name]: value}));
  }

  const handleCategorySelect = (key: number, categoryName: string) => {
    setPropertyCategoryKey(key);
    setCategoryForm((prev) => ({
      categoryName,
    }));
  }

  const handlePropertySelect = (key: number, propertyName: string) => {
    setPropertyKey(key);
    setPropertyForm((prev) => ({
      propertyName,
    }));
  }

  const personalFormHandleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateCurrentStep(2);
  };

  const categoryFormHandleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateCurrentStep(3);
  };

  const propertyFormHandleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateCurrentStep(4);
  };

  const configurationFormHandleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateCurrentStep(5);
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
      <div className="relative z-10 flex min-h-svh flex-col px-6 py-7 sm:px-10 sm:py-10 lg:px-[5vw] lg:py-[6.7vh]">
        <header className="flex items-start justify-between">
          <PanchshilMark />
          <FormStages step={currentStep} />
        </header>
        {
          displayStep === 1 && (
          <section className={`flex items-stretch pt-10 gap-20 transition-all duration-300 ease-in-out overflow-hidden ${fading ? "opacity-0" : "opacity-100"}`}>
            <div style={{backgroundImage: `url(${basePath}images/form/step-01.png)`}} className="bg-no-repeat bg-cover bg-center w-2xl relative px-10 py-10">
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="flex flex-col relative h-full">
                <p className="uppercase text-[#b29a75] tracking-[0.2em]">Step 01 / Personal</p>
                <div className="mt-auto flex flex-col gap-10">
                  <h3 className={`${zapfHumanist601Roman.variable} text-[30px]`}>A consultation begins with knowing you.</h3>
                  <p className={`font-open-sans text-base leading-[1.5] text-white/65`}>Your details remain private. They allow our team to prepare a considered, personalised response — the way Panchshil has always served its patrons.</p>
                </div>
              </div>
            </div>
            <form ref={personalFormRef} onSubmit={personalFormHandleSubmit} className="flex flex-col gap-5 w-full font-open-sans tracking-wider text-[#ACAAA3]">
              <div className="flex gap-5 justify-between">
                <div className="flex flex-col gap-3 border-[#4A4D49] border-b-[1px]">
                  <label>Title</label>
                  <div className="relative">
                    <select name="title" value={personalForm.title} onChange={handleChange} className="appearance-none w-35">
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
                  <input type="text" name="firstName" value={personalForm.firstName} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px] relative">
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={personalForm.lastName} onChange={handleChange} />
                </div>
              </div>
              <div className="flex gap-5 justify-between">
                <div className="flex flex-col gap-3 w-30 border-[#4A4D49] border-b-[1px]">
                  <label>Code</label>
                  <div className="relative">
                    <select name="countryCode" value={personalForm.countryCode} onChange={handleChange} className="appearance-none">
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
                  <input type="tel" name="mobileNumber" value={personalForm.mobileNumber} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-3 w-30 border-[#4A4D49] border-b-[1px]">
                  <label>Code</label>
                  <div className="relative">
                    <select name="alternateCountryCode" value={personalForm.alternateCountryCode} onChange={handleChange} className="appearance-none">
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
                  <input type="tel" name="alternateNumber" value={personalForm.alternateNumber} onChange={handleChange} />
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px] relative">
                <label>Email Address</label>
                <input type="email" name="email" value={personalForm.email} onChange={handleChange} />
              </div>
              <div className="flex gap-5 justify-between border-[#4A4D49] border-b-[1px]">
                <div className="flex flex-col gap-3 w-full relative">
                  <label>Organisation <span className="text-gray-500 text-[10px]">(Optional)</span></label>
                  <input type="text" name="organisation" value={personalForm.organisation} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px] relative">
                  <label>Designation <span className="text-gray-500 text-[10px]">(Optional)</span></label>
                  <input type="text" name="designation" value={personalForm.designation} onChange={handleChange} />
                </div>
              </div>
              <div className="flex gap-5 justify-between">
                <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px]">
                  <label>Country</label>
                  <div className="relative">
                    <select name="country" value={personalForm.country} onChange={handleChange} className="appearance-none">
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
                  <input type="text" name="pincode" value={personalForm.pincode} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px] relative">
                  <label>City <span className="text-gray-500 text-[10px]">(Optional)</span></label>
                  <input type="text" name="city" value={personalForm.city} onChange={handleChange} />
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full border-[#4A4D49] border-b-[1px] relative">
                <label>Address <span className="text-gray-500 text-[10px]">(Optional)</span></label>
                <input type="text" name="address" value={personalForm.address} onChange={handleChange} />
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
              <h3 className={`${zapfHumanist601Roman.variable} text-[30px]`}>What draws your attention?</h3>
              <p className={`font-open-sans text-base leading-[1.5] text-white/65`}>Select one or more directions. The remainder of the consultation will adapt quietly to every interest you choose.</p>
            </div>
            <form ref={categoryFormRef} onSubmit={categoryFormHandleSubmit} className="flex flex-col gap-5 w-full font-open-sans tracking-wider text-[#ACAAA3]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {
                  property_categories && property_categories.length > 0 && property_categories.map((property_category, key) => (
                    <div key={key} className={`bg-no-repeat bg-cover w-xs px-7 py-10 h-100 relative cursor-pointer transition-all duration-300 hover:border border-[#9E8C70] shadow-[inset_0px_0px_0px_0px_#9E8C7080,_0px_20px_32px_0px_#9E8C7080,_0px_10px_108.5px_0px_#9E8C7080] ${propertyCategoryKey === key ? 'border border-[#9E8C70] shadow-[inset_0px_0px_0px_0px_#9E8C7080,_0px_20px_32px_0px_#9E8C7080,_0px_10px_108.5px_0px_#9E8C7080]' : '' }`} style={{backgroundImage: `url(images/${property_category.property_category_thumbnail})`}} onClick={() => (handleCategorySelect(key, property_category.property_category_name))}>
                      <div className="absolute inset-0 bg-black/70"></div>
                      <div className={`w-7 h-7 rounded-full border border-[#7B7B7B] border-[1px] absolute right-5 top-5 ${propertyCategoryKey === key ? 'bg-[#9E8C70]' : '' } flex justify-center items-center`}>
                        <Image src={`${basePath}images/icons/tick.png`} width={12} height={10} alt="Tick" className={`w-[10px] h-[7.55px] ${propertyCategoryKey !== key ? 'hidden' : ''}`} />
                      </div>
                      <div className="flex flex-col relative h-full">
                        <p className="uppercase text-[#b29a75] tracking-[0.2em]">{property_category.property_category_caption}</p>
                        <div className="mt-auto flex flex-col gap-5">
                          <h3 className={`${zapfHumanist601Roman.variable} text-[28px] text-white`}>{property_category.property_category_name}</h3>
                          <p className={`font-open-sans text-base leading-[1.5] text-white/65`}>{property_category.property_category_description}</p>
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
          <section className={`flex flex-col pt-10 gap-20 transition-all duration-300 ease-in-out ${fading ? "opacity-0" : "opacity-100"}`}>
            <div className="flex flex-col gap-5 max-w-[650px]">
              <p className="uppercase text-[#b29a75] tracking-[0.2em]">Step 03 / Curated Selection</p>
              <h3 className={`${zapfHumanist601Roman.variable} text-[30px]`}>Choose the developments that interest you.</h3>
              <p className={`font-open-sans text-base leading-[1.5] text-white/65`}>Select any number of addresses across your chosen directions — each will be tailored individually in the next step.</p>
            </div>
            <form ref={propertyFormRef} onSubmit={propertyFormHandleSubmit} className="flex flex-col gap-5 w-full font-open-sans tracking-wider text-[#ACAAA3]">
              <p className="uppercase text-[#b29a75] tracking-[0.2em]">{propertyCategory.property_category_caption}</p>
              <div className="flex justify-between">
                <h3 className={`${zapfHumanist601Roman.variable} text-[30px]`}>{propertyCategory.property_category_name}</h3>
                <span className="font-open-sans uppercase">{propertyCategory.properties.length} {propertyCategory.properties.length === 1 ? 'address' : 'addresses' }</span>
              </div>
              <hr />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                {
                  propertyCategory.properties && propertyCategory.properties.length > 0 && propertyCategory.properties.map((property, key) => (
                    <div key={key} className={`bg-no-repeat bg-cover w-full px-7 py-7 h-100 relative flex items-end cursor-pointer transition-all duration-300 hover:border border-[#9E8C70] shadow-[inset_0px_0px_0px_0px_#9E8C7080,_0px_20px_32px_0px_#9E8C7080,_0px_10px_108.5px_0px_#9E8C7080] ${propertyKey === key ? 'border border-[#9E8C70] shadow-[inset_0px_0px_0px_0px_#9E8C7080,_0px_20px_32px_0px_#9E8C7080,_0px_10px_108.5px_0px_#9E8C7080]' : '' }`} style={{backgroundImage: `url(images/${property.property_thumbnail})`}} onClick={() => (handlePropertySelect(key, property.property_name))}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className={`w-7 h-7 rounded-full border border-[#7B7B7B] border-[1px] absolute right-5 top-5 ${propertyKey === key ? 'bg-[#9E8C70]' : '' } flex justify-center items-center`}>
                        <Image src={`${basePath}images/icons/tick.png`} width={12} height={10} alt="Tick" className={`w-[10px] h-[7.55px] ${propertyKey !== key ? 'hidden' : ''}`} />
                      </div>
                      <div className="flex flex-col gap-2 text-white relative">
                          <h4 className="uppercase text-sm">{property.property_location}</h4>
                          <h3 className={`${zapfHumanist601Roman.variable} text-[24px]`}>{property.property_name}</h3>
                          <p className={`font-open-sans text-base leading-[1.5]`}>{property.property_description}</p>
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
              <h3 className={`${zapfHumanist601Roman.variable} text-[30px]`}>Tailor each address individually.</h3>
              <p className={`font-open-sans text-base leading-[1.5] text-white/65`}>Step through every selected development. Each can be refined to a different scale, configuration, and intent.</p>
            </div>
            <form ref={configurationFormRef} onSubmit={configurationFormHandleSubmit} className="flex flex-col gap-5 w-full font-open-sans tracking-wider text-[#ACAAA3]">
              <p className="uppercase text-[#b29a75] tracking-[0.2em]">{propertyCategory.property_category_caption}</p>
              <h3 className={`${zapfHumanist601Roman.variable} text-[30px]`}>{property.property_name}</h3>
              <span className="text-gray-500 text-sm">{property.property_location}</span>
              <hr />
              <p className="uppercase text-[#b29a75] tracking-[0.2em] mt-10">Configurations</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 text-white">
                {
                  property.property_configurations && property.property_configurations.length > 0 && property.property_configurations.map((configuration, key) => (
                    <div className={`w-full border px-6 py-10 cursor-pointer transition-all duration-300 hover:border-[#ACAAA3] hover:border-[2px] hover:bg-[#20202066] ${configuration === configurationForm.configurationName ? 'border-[#ACAAA3] border-[2px] bg-[#20202066]' : 'border-[#4A4D49]' }`} key={key} onClick={() => setConfigurationForm((prev) => ({...prev, configurationName: configuration}))}>{configuration}</div>
                  ))
                }
              </div>
              <p className="uppercase text-[#b29a75] tracking-[0.2em] mt-10">Intended Use</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 text-white">
                {
                  propertyCategory.property_category_intended_uses && propertyCategory.property_category_intended_uses.length > 0 && propertyCategory.property_category_intended_uses.map((intent_use, key) => (
                    <div className={`w-full border px-6 py-10 cursor-pointer transition-all duration-300 hover:border-[#ACAAA3] hover:border-[2px] hover:bg-[#20202066] ${intent_use === configurationForm.intentedUse ? 'border-[#ACAAA3] border-[2px] bg-[#20202066]' : 'border-[#4A4D49]' }`} key={key} onClick={() => setConfigurationForm((prev) => ({...prev, intentedUse: intent_use}))}>{intent_use}</div>
                  ))
                }
              </div>
              <div className="flex flex-col gap-3 w-full lg:w-1/2 border-[#4A4D49] border-b-[1px] mt-10">
                <label>Investment Timeline <span className="text-gray-500 text-[10px]">Optional</span></label>
                <div className="relative">
                  <select name="investmentTimeline" value={configurationForm.investmentTimeline} onChange={handleChange} className="appearance-none">
                    <option value="">-</option>
                    <option value="Within 3 months">Within 3 months</option>
                    <option value="Within 6 months">Within 6 months</option>
                  </select>
                  <SelectTagArrow />
                </div>
              </div>
              <BottomNav step={3} updateCurrentStep={updateCurrentStep} />
            </form>
          </section>
        )
        }
        {
          displayStep === 5 && (
          <section className={`flex flex-col pt-10 gap-10 transition-all duration-300 ease-in-out ${fading ? "opacity-0" : "opacity-100"}`}>
            <div className="flex flex-col gap-5 max-w-[650px]">
              <p className="uppercase text-[#b29a75] tracking-[0.2em]">Step 05 / Review</p>
              <h3 className={`${zapfHumanist601Roman.variable} text-[30px]`}>A quiet review before we begin.</h3>
              <p className={`font-open-sans text-base leading-[1.5] text-white/65`}>Edit any section. Submit when ready — a Panchshil representative will reach out personally.</p>
            </div>
          </section>
        )
        }
      </div>
    </main>
  );
}
