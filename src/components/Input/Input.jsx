import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const Input = ({ className, placeholder, type, value, onChange, onKeyUp, name }) => (
    <input className={'input ' + className} placeholder={placeholder} type={type} value={value}
        onChange={onChange} onKeyUp={onKeyUp} name={name} />
);

Input.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func
};
Input.defaultProps = {
    className: '',
    placeholder: '',
    type: 'text',
    value: '',
    name: '',
    onChange: () => { },
    onKeyUp: () => { }
};
export default Input;
