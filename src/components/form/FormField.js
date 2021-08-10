import React from 'react';
import { useFormikContext } from 'formik';

import AppTextInput from './AppTextInput';

function FormField({name, reference, onChange, ...otherProps}) {
    const onChangeFun = () => {
        if (onChange) {
            onChange()
        }
    }
    const {setFieldTouched, handleChange, errors, touched, submitCount, } = useFormikContext();
    return (
        <AppTextInput 
            onBlur={() => setFieldTouched(name)}
            onChangeText={onChangeFun(), handleChange(name)}
            reference={reference}
            {...otherProps}
        />
    );
}

export default FormField;