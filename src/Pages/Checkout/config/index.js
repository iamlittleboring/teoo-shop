export const STEP = {
    CONTACT: 0,
    SHIPPING: 1,
    PAYMENT: 2,
    REVIEW: 3,
};

export const STEP_KEYS = ["contact", "shipping", "payment", "review"];

export const contactFormState = {
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
};

export const PAYMENT_PROVIDER_LABEL_KEYS = {
    pp_system_default: "checkout.paymentProviders.system",
    pp_stripe_stripe: "checkout.paymentProviders.stripe",
    "pp_plata-by-mono_default": "checkout.paymentProviders.mono",
    "pp_cash-on-delivery_default": "checkout.paymentProviders.cod",
};

export const CARRIER = {
    NOVA_POSHTA: "nova-poshta",
    UKRPOSHTA: "ukrposhta",
    STANDARD: "standard",
};

export const CARRIER_ORDER = [CARRIER.STANDARD, CARRIER.NOVA_POSHTA, CARRIER.UKRPOSHTA];

export const CARRIER_LABEL_KEYS = {
    [CARRIER.NOVA_POSHTA]: "checkout.carriers.novaPoshta",
    [CARRIER.UKRPOSHTA]: "checkout.carriers.ukrposhta",
    [CARRIER.STANDARD]: "checkout.carriers.standard",
};

// Shipping option `type.code` values that need a Nova Poshta location picked
// in the shipping step — a branch/postomat, or a street+building for courier.
export const NP_LOCATION_OPTION_CODES = {
    "np-warehouse": "warehouse",
    "np-postomat": "postomat",
    "np-courier": "courier",
};
