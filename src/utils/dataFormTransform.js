export const dataToFormTransform = (data, oldForm) => {
    /* 
        studentForm tiene los datos que quiero mostrar pero sin values
        selectedStudent tiene los datos que tengo 
    */
    const dataKeys = Object.keys(data);
    const dataValues = Object.values(data);
    const newStudentForm = Object.assign({}, oldForm);  // immutable
    dataKeys.forEach((key, i) => {
        const value = dataValues[i];
        // ignore values that are not shown in form (add them later in request)
        // password is special as it has an algorythm, so show as an empty value (always create a "new" password)
        if (!['avatarUrl', 'complete', 'id', 'role', 'password'].some(item => item === key)) {
            newStudentForm[key] = { ...newStudentForm[key], value };
        }
    });
    return newStudentForm;
};

export const formToDataTransform = (form) => {
    const copiedFormObject = Object.assign({}, form);  // immutable
    const formKeys = Object.keys(copiedFormObject);
    let result = {};
    formKeys.forEach((key, i) => {
        result[key] = form[key].value;
    });
    return result;
};