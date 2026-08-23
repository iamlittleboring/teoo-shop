import { CARRIER } from "../config";

export const getCarrierFromOption = (option) => {
    const code = option?.type?.code || "";

    if (code.startsWith("np-")) {
        return CARRIER.NOVA_POSHTA;
    }

    if (code.startsWith("ukrposhta-")) {
        return CARRIER.UKRPOSHTA;
    }

    return CARRIER.STANDARD;
};

export const groupShippingOptionsByCarrier = (options) => {
    return options.reduce((groups, option) => {
        const carrier = getCarrierFromOption(option);
        groups[carrier] = groups[carrier] || [];
        groups[carrier].push(option);
        return groups;
    }, {});
};
