import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import "../styles/searchbar.css"


const products = [
  { id: 1, name: 'Smart Goggles' },
  { id: 2, name: 'Smart Watch' },
  { id: 3, name: 'Smart Thermostat' },
  { id: 4, name: 'Smart Speaker' },
  { id: 5, name: 'Smart Lighting' },
  { id: 6, name: 'Smart Doorlock' },
];

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  return inputValue.length === 0 ? [] : products.filter(
    product => product.name.toLowerCase().includes(inputValue)
  );
};

// Renders each suggestion
const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

const SearchBar = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    const productElement = document.getElementById(suggestion.id);
    if (productElement) {
      productElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="react-autosuggest__suggestions-container">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: 'Search products...',
          value,
          onChange,
        }}
        onSuggestionSelected={onSuggestionSelected}
      />
    </div>
  );
};

export default SearchBar;