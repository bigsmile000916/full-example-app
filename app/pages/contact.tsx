import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout';
import { NextPageWithLayout } from './_app';

const Contact: NextPageWithLayout = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="container">
      <h1>Contact</h1>
      <form>
        <label>
          <span>Name</span>
          <input
            required
            {...register('name', {
              required: 'required',
            })}
            type="text"
            autoComplete="name"
          />
        </label>
        {errors.name && <p className="text-red-500">errors.name?.message</p>}

        <label>
          <span>Email</span>
          <input
            required
            {...register('email', {
              required: 'required',
            })}
            type="email"
            autoComplete="email"
          />
        </label>

        <label>
          <span>Email</span>
          <input
            required
            {...register('email', {
              required: 'required',
            })}
            type="email"
            autoComplete="email"
          />
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
};

Contact.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Contact;
