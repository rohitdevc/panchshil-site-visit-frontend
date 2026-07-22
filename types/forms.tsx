export interface PersonalForm {
  title: string;
  firstName: string;
  lastName: string;
  countryCode: number;
  mobileNumber: string;
  alternateCountryCode: number;
  alternateNumber: string;
  email: string;
  organization: string;
  designation: string;
  country: string;
  pincode: string;
  city: string;
  address: string;
};

export interface CategoryForm {
  categoryName: string;
}

export interface PropertyForm {
  propertyName: string;
  propertyLocation: string;
}

export interface ConfigurationForm {
  configurationName: string;
  intentedUse: string;
  investmentTimeline: string;
}

export interface CustomerFormErrors {
  title?: string;
  firstName?: string,
  lastName?: string,
  countryCode?: string,
  mobileNumber?: string,
  alternateCountryCode?: string,
  alternateNumber?: string,
  email?: string,
  organization?: string,
  designation?: string,
  country?: string,
  pincode?: string,
  city?: string,
  address?: string,
  configurationName?: string,
  intentedUse?: string,
  investmentTimeline?: string
}