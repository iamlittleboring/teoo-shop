const updateFormByEvent = (setState) => (event) => {
    const { name, value } = event.target;

    setState((prev) => ({
        ...prev,
        [name]: value,
    }));
};

export { updateFormByEvent };
