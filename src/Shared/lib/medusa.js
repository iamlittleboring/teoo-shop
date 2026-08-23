import Medusa from "@medusajs/js-sdk";

import {
    MEDUSA_BACKEND_URL,
    MEDUSA_PUBLISHABLE_KEY,
    MEDUSA_REGION_ID,
} from "@shared/config/medusa";

const sdk = new Medusa({
    baseUrl: MEDUSA_BACKEND_URL,
    publishableKey: MEDUSA_PUBLISHABLE_KEY,
    auth: {
        type: "jwt",
        jwtTokenStorageMethod: "local",
    },
});

let regionIdPromise;

const resolveRegionId = async () => {
    if (MEDUSA_REGION_ID) {
        return MEDUSA_REGION_ID;
    }

    if (!regionIdPromise) {
        regionIdPromise = sdk.store.region.list({ limit: 1 }).then(({ regions = [] }) => {
            const regionId = regions[0]?.id;

            if (!regionId) {
                throw new Error("No store regions available");
            }

            return regionId;
        });
    }

    return regionIdPromise;
};

export { resolveRegionId, sdk };
