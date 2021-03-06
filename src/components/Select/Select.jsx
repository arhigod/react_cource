import React, { useState, useCallback } from 'react';
import { useComponentDidUnmount } from '../../hooks/lifecycle';
import PropTypes from 'prop-types';

import './Select.css';

const Select = ({ placeholder, multiselect, items, value, onChange, error }) => {
    const [isOpen, setIsOpen] = useState(false);

    useComponentDidUnmount(() => {
        document.removeEventListener('click', onDocumentClick);
    }, [onDocumentClick]);

    const onDocumentClick = useCallback((e) => {
        if (!(multiselect && e.target.closest('.select li'))) {
            setIsOpen(false);
            document.removeEventListener('click', onDocumentClick);
        }
    }, [multiselect]);

    const onSelectClick = useCallback(() => {
        if (!isOpen) {
            document.addEventListener('click', onDocumentClick);
            setIsOpen(true);
        }
    }, [isOpen, onDocumentClick]);

    const onItemClick = useCallback(({ currentTarget }) => {
        let item = currentTarget.getAttribute('data-item');

        if (multiselect) {
            let newValue = [...value];

            if (newValue.includes(item)) {
                newValue = newValue.filter(x => x !== item);
            } else {
                newValue.push(item);
            }
            newValue.sort();

            onChange(newValue);
        } else {
            onChange([item]);
        }
    }, [multiselect, onChange, value]);

    return (
        <>
            <div className={`select ${error ? 'selectError' : ''} ${isOpen ? 'open' : ''}`} onClick={onSelectClick}>
                <span className={value.length ? '' : 'placeholder'}>
                    {value.join(', ') || placeholder}
                </span>
                <ul>
                    {
                        items.map((item) => (
                            <li className={value.includes(item) ? 'selected' : ''} onClick={onItemClick}
                                key={item} data-item={item}>
                                {item}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='selectErrorMessage'>{error}</div>
        </>
    );
};

Select.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.arrayOf(PropTypes.string),
    multiselect: PropTypes.bool,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func
};
Select.defaultProps = {
    items: [],
    value: [],
    multiselect: false,
    placeholder: 'Select an item',
    error: '',
    onChange: () => { }
};
export default Select;
