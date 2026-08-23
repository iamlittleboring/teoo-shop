import { useEffect, useState } from "react";

import { Field, InputField, Label } from "@shared/styles/form";
import Select from "@shared/ui/Select";

import { searchNovaPoshtaCities, searchNovaPoshtaStreets, searchNovaPoshtaWarehouses } from "../api";
import Styled from "./styled";

// Shared by Checkout's shipping step and the account's favorite-branch
// picker — both need the same city -> warehouse/street search, just wired
// to a different "what happens once a location is picked" behavior.
const NovaPoshtaLocationPicker = ({
    defaultLocation,
    locationType,
    note,
    onNoteChange,
    onSelect,
    t,
}) => {
    const isCourier = locationType === "courier";

    const [configured, setConfigured] = useState(true);
    const [cityQuery, setCityQuery] = useState(defaultLocation?.cityName || "");
    const [cityResults, setCityResults] = useState([]);
    const [isCitySearching, setIsCitySearching] = useState(false);
    const [selectedCity, setSelectedCity] = useState(() =>
        defaultLocation ? { ref: defaultLocation.cityRef, name: defaultLocation.cityName } : null
    );
    const [warehouseResults, setWarehouseResults] = useState([]);
    const [isWarehouseSearching, setIsWarehouseSearching] = useState(false);
    const [selectedWarehouseRef, setSelectedWarehouseRef] = useState(
        defaultLocation?.warehouseRef || ""
    );
    const [streetQuery, setStreetQuery] = useState("");
    const [streetResults, setStreetResults] = useState([]);
    const [isStreetSearching, setIsStreetSearching] = useState(false);
    const [selectedStreet, setSelectedStreet] = useState(null);
    const [building, setBuilding] = useState("");
    const [manualCity, setManualCity] = useState("");
    const [manualWarehouse, setManualWarehouse] = useState("");

    // Report the pre-filled favorite branch to the parent once on mount —
    // otherwise the "Continue" button stays disabled until the customer
    // re-picks a branch they'd already saved.
    useEffect(() => {
        if (!defaultLocation) return;

        onSelect({
            npCityRef: defaultLocation.cityRef,
            npCityName: defaultLocation.cityName,
            npWarehouseRef: defaultLocation.warehouseRef,
            npWarehouseDescription: defaultLocation.warehouseDescription,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!cityQuery || cityQuery.length < 2 || selectedCity) {
            setCityResults([]);
            return;
        }

        let cancelled = false;
        setIsCitySearching(true);

        const timeout = setTimeout(() => {
            searchNovaPoshtaCities(cityQuery)
                .then((response) => {
                    if (cancelled) return;
                    setConfigured(response.configured);
                    setCityResults(response.cities || []);
                })
                .catch(() => {
                    if (!cancelled) setCityResults([]);
                })
                .finally(() => {
                    if (!cancelled) setIsCitySearching(false);
                });
        }, 350);

        return () => {
            cancelled = true;
            clearTimeout(timeout);
        };
    }, [cityQuery, selectedCity]);

    useEffect(() => {
        if (isCourier || !selectedCity) {
            setWarehouseResults([]);
            return;
        }

        let cancelled = false;
        setIsWarehouseSearching(true);

        searchNovaPoshtaWarehouses(selectedCity.ref, locationType)
            .then((response) => {
                if (!cancelled) setWarehouseResults(response.warehouses || []);
            })
            .catch(() => {
                if (!cancelled) setWarehouseResults([]);
            })
            .finally(() => {
                if (!cancelled) setIsWarehouseSearching(false);
            });

        return () => {
            cancelled = true;
        };
    }, [selectedCity, locationType, isCourier]);

    useEffect(() => {
        if (!isCourier || !streetQuery || streetQuery.length < 2 || selectedStreet) {
            setStreetResults([]);
            return;
        }

        let cancelled = false;
        setIsStreetSearching(true);

        const timeout = setTimeout(() => {
            searchNovaPoshtaStreets(selectedCity?.settlementRef, streetQuery)
                .then((response) => {
                    if (cancelled) return;
                    setStreetResults(response.streets || []);
                })
                .catch(() => {
                    if (!cancelled) setStreetResults([]);
                })
                .finally(() => {
                    if (!cancelled) setIsStreetSearching(false);
                });
        }, 350);

        return () => {
            cancelled = true;
            clearTimeout(timeout);
        };
    }, [streetQuery, selectedStreet, isCourier, selectedCity]);

    const handleSelectCity = (city) => {
        setSelectedCity(city);
        setCityQuery(city.name);
        setCityResults([]);
        setSelectedWarehouseRef("");
        setSelectedStreet(null);
        setStreetQuery("");
        setBuilding("");
        onSelect(null);
    };

    const handleSelectWarehouse = (event) => {
        const ref = event.target.value;
        const warehouse = warehouseResults.find((item) => item.ref === ref);
        setSelectedWarehouseRef(ref);

        if (!warehouse) return;

        onSelect({
            npCityRef: selectedCity.ref,
            npCityName: selectedCity.name,
            npWarehouseRef: warehouse.ref,
            npWarehouseDescription: warehouse.description,
        });
    };

    const emitCourierSelection = (street, buildingValue) => {
        if (!street || !buildingValue.trim()) {
            onSelect(null);
            return;
        }

        onSelect({
            npCityRef: selectedCity.ref,
            npCityName: selectedCity.name,
            npStreetRef: street.ref,
            npStreetName: street.name,
            npBuilding: buildingValue.trim(),
            deliveryAddress: `${street.name}, ${buildingValue.trim()}, ${selectedCity.name}`,
        });
    };

    const handleSelectStreet = (street) => {
        setSelectedStreet(street);
        setStreetQuery(street.name);
        setStreetResults([]);
        emitCourierSelection(street, building);
    };

    const handleBuildingChange = (value) => {
        setBuilding(value);
        emitCourierSelection(selectedStreet, value);
    };

    const handleManualChange = (city, detail) => {
        onSelect(city.trim() && detail.trim() ? { npCityName: city, npWarehouseNumber: detail } : null);
    };

    const warehouseLabel = isCourier
        ? t("checkout.novaPoshta.streetBuildingLabel")
        : locationType === "postomat"
          ? t("checkout.novaPoshta.postomatLabel")
          : t("checkout.novaPoshta.warehouseLabel");
    const manualDetailPlaceholder = isCourier
        ? t("checkout.novaPoshta.manualStreetPlaceholder")
        : t("checkout.novaPoshta.manualWarehousePlaceholder");
    const warehousePlaceholder =
        locationType === "postomat"
            ? t("checkout.novaPoshta.postomatPlaceholder")
            : t("checkout.novaPoshta.warehousePlaceholder");

    if (!configured) {
        return (
            <Styled.LocationPicker>
                <Styled.SearchHint>{t("checkout.novaPoshta.notConfigured")}</Styled.SearchHint>
                <Styled.LocationFieldsRow>
                    <Field>
                        <Label>{t("checkout.novaPoshta.cityLabel")}</Label>
                        <InputField
                            value={manualCity}
                            onChange={(event) => {
                                setManualCity(event.target.value);
                                handleManualChange(event.target.value, manualWarehouse);
                            }}
                            placeholder={t("checkout.novaPoshta.manualCityPlaceholder")}
                        />
                    </Field>
                    <Field>
                        <Label>{warehouseLabel}</Label>
                        <InputField
                            value={manualWarehouse}
                            onChange={(event) => {
                                setManualWarehouse(event.target.value);
                                handleManualChange(manualCity, event.target.value);
                            }}
                            placeholder={manualDetailPlaceholder}
                        />
                    </Field>
                </Styled.LocationFieldsRow>
                {isCourier && (
                    <Field>
                        <Label>{t("checkout.courier.noteLabel")}</Label>
                        <InputField
                            value={note}
                            onChange={(event) => onNoteChange(event.target.value)}
                            placeholder={t("checkout.courier.notePlaceholder")}
                        />
                    </Field>
                )}
            </Styled.LocationPicker>
        );
    }

    return (
        <Styled.LocationPicker>
            <Styled.LocationFieldsRow>
                <Field>
                    <Label>{t("checkout.novaPoshta.cityLabel")}</Label>
                    <Styled.SearchWrap>
                        <InputField
                            value={cityQuery}
                            onChange={(event) => {
                                setCityQuery(event.target.value);
                                setSelectedCity(null);
                                onSelect(null);
                            }}
                            placeholder={t("checkout.novaPoshta.cityPlaceholder")}
                            autoComplete="off"
                        />
                        {cityQuery && !selectedCity && (
                            <Styled.SearchDropdown>
                                {isCitySearching && (
                                    <Styled.SearchHint>
                                        {t("checkout.novaPoshta.searching")}
                                    </Styled.SearchHint>
                                )}
                                {!isCitySearching &&
                                    cityQuery.length >= 2 &&
                                    cityResults.length === 0 && (
                                        <Styled.SearchHint>
                                            {t("checkout.novaPoshta.noResults")}
                                        </Styled.SearchHint>
                                    )}
                                {cityResults.map((city) => (
                                    <Styled.SearchResultItem
                                        key={city.ref}
                                        type="button"
                                        onClick={() => handleSelectCity(city)}
                                    >
                                        {city.name}
                                    </Styled.SearchResultItem>
                                ))}
                            </Styled.SearchDropdown>
                        )}
                    </Styled.SearchWrap>
                </Field>

                {selectedCity && !isCourier && (
                    <Field>
                        <Label>{warehouseLabel}</Label>
                        {isWarehouseSearching && (
                            <Styled.SearchHint>{t("checkout.novaPoshta.searching")}</Styled.SearchHint>
                        )}
                        {!isWarehouseSearching && warehouseResults.length === 0 && (
                            <Styled.SearchHint>{t("checkout.novaPoshta.noResults")}</Styled.SearchHint>
                        )}
                        {!isWarehouseSearching && warehouseResults.length > 0 && (
                            <Select value={selectedWarehouseRef} onChange={handleSelectWarehouse}>
                                <option value="" disabled>
                                    {warehousePlaceholder}
                                </option>
                                {warehouseResults.map((warehouse) => (
                                    <option key={warehouse.ref} value={warehouse.ref}>
                                        {warehouse.description}
                                    </option>
                                ))}
                            </Select>
                        )}
                    </Field>
                )}

                {selectedCity && isCourier && (
                    <Field>
                        <Label>{t("checkout.novaPoshta.streetLabel")}</Label>
                        <Styled.SearchWrap>
                            <InputField
                                value={streetQuery}
                                onChange={(event) => {
                                    setStreetQuery(event.target.value);
                                    setSelectedStreet(null);
                                    onSelect(null);
                                }}
                                placeholder={t("checkout.novaPoshta.streetPlaceholder")}
                                autoComplete="off"
                            />
                            {streetQuery && !selectedStreet && (
                                <Styled.SearchDropdown>
                                    {isStreetSearching && (
                                        <Styled.SearchHint>
                                            {t("checkout.novaPoshta.searching")}
                                        </Styled.SearchHint>
                                    )}
                                    {!isStreetSearching &&
                                        streetQuery.length >= 2 &&
                                        streetResults.length === 0 && (
                                            <Styled.SearchHint>
                                                {t("checkout.novaPoshta.noResults")}
                                            </Styled.SearchHint>
                                        )}
                                    {streetResults.map((street) => (
                                        <Styled.SearchResultItem
                                            key={street.ref}
                                            type="button"
                                            onClick={() => handleSelectStreet(street)}
                                        >
                                            {street.name}
                                        </Styled.SearchResultItem>
                                    ))}
                                </Styled.SearchDropdown>
                            )}
                        </Styled.SearchWrap>
                    </Field>
                )}

                {selectedStreet && isCourier && (
                    <Field>
                        <Label>{t("checkout.novaPoshta.buildingLabel")}</Label>
                        <InputField
                            value={building}
                            onChange={(event) => handleBuildingChange(event.target.value)}
                            placeholder={t("checkout.novaPoshta.buildingPlaceholder")}
                        />
                    </Field>
                )}
            </Styled.LocationFieldsRow>

            {isCourier && (
                <Field>
                    <Label>{t("checkout.courier.noteLabel")}</Label>
                    <InputField
                        value={note}
                        onChange={(event) => onNoteChange(event.target.value)}
                        placeholder={t("checkout.courier.notePlaceholder")}
                    />
                </Field>
            )}
        </Styled.LocationPicker>
    );
};

export default NovaPoshtaLocationPicker;
