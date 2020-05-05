import React, { useState } from 'react';
import './SearchAudio.css';
import PropTypes from 'prop-types';

const SearchAudio = ({ onSetSearch }) => {

    const [ value, setValue ] = useState('');
    
    const onChangeValue = (e) => {
        setValue(e.target.value);
        onSetSearch(e.target.value);
    };

    return (
        <div className="search_audio">
            <input 
                type="search"
                placeholder="Поиск музыки"
                value={value}
                onChange={onChangeValue}
            />
        </div>
    );
};

SearchAudio.propTypes = {
    onSetSearch: PropTypes.func,
};

export default SearchAudio;