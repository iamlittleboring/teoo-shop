import { sdk } from "@shared/lib/medusa";

const searchNovaPoshtaCities = async (query) => {
    return sdk.client.fetch("/store/nova-poshta/cities", {
        query: { q: query },
    });
};

const searchNovaPoshtaWarehouses = async (cityRef, type) => {
    return sdk.client.fetch("/store/nova-poshta/warehouses", {
        query: { city_ref: cityRef, type },
    });
};

const searchNovaPoshtaStreets = async (settlementRef, query) => {
    return sdk.client.fetch("/store/nova-poshta/streets", {
        query: { settlement_ref: settlementRef, q: query },
    });
};

export { searchNovaPoshtaCities, searchNovaPoshtaStreets, searchNovaPoshtaWarehouses };
