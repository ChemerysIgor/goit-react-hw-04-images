import { Formik, ErrorMessage } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { useState } from 'react';
import { Header, ContactsForm, Input, SearchButton } from './SearchbarStyled';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

const schema = yup.object().shape({ search: yup.string().required() });

export default function Searchbar({ onForm }) {
  const [search, setSearch] = useState('');

  const handleWord = evt => {
    setSearch(evt.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onForm(search);
  };

  return (
    <Header>
      <Formik validationSchema={schema}>
        <ContactsForm onSubmit={handleSubmit}>
          <SearchButton type="submit">
            <BsSearch />
          </SearchButton>
          <Input
            name="search"
            value={search}
            onChange={handleWord}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage name="search" />
        </ContactsForm>
      </Formik>
    </Header>
  );
}

Searchbar.propTypes = { onForm: PropTypes.func.isRequired };
