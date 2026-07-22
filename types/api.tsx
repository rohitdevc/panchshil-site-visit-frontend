export interface MetaData {
    meta_title: string;
    meta_description: string;
    canonical_tag: string;
}

export interface Banner {
    banner_image: string;
    banner_image_caption: string;
    banner_image_description: string;
}

export interface TokenResponse {
  token: string;
}

export interface IntroProps {
    intro_title: string;
    intro_caption: string;
    intro_description: string;
    banner_image: string;
}

export interface CustomerFormProps {
    customer_title: string;
    customer_full_name: string;
    customer_mobile_number: string;
    customer_alternate_number: string;
    customer_email_address: string;
    customer_organization_name: string;
    customer_designation: string;
    customer_country_name: string;
    customer_pin_code: string;
    customer_city_name: string;
    customer_address: string;
    customer_property_category_name: string;
    customer_property_name: string;
    customer_property_configuration: string;
    customer_property_intent: string;
    customer_property_investment_timeline: string;
    ip_address: string;
    referer_url: string;
}

type Property = {
    property_name: string;
    property_location: string;
    property_description: string;
    property_thumbnail: string;
    property_configurations: string[]
}

export interface PropertyDataProps {
    property_category_name: string;
    property_category_caption: string;
    property_category_description: string;
    property_category_thumbnail: string;
    property_category_intended_uses: string[];
    properties: Property[]
}