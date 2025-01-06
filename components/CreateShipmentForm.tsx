'use client';
import * as yup from 'yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { createShipment } from '@/lib/server-functions';

const shipmentSchema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  address: yup.string().required('Address is required'),
  country: yup.string().required('Country is required'),
  zip_code: yup.string(),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
});

type ShipmentData = yup.InferType<typeof shipmentSchema>;

export default function CreateShipmentForm({
  page,
  length,
}: {
  page: number;
  length: number;
}) {
  const queryClient = useQueryClient();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShipmentData>({
    resolver: yupResolver(shipmentSchema),
  });

  const handleCloseModal = () => {
    reset();
    dialogRef.current?.close();
  };

  const handleSubmitForm = async (data: ShipmentData) => {
    await createShipment({ id: length + 1, ...data });
    queryClient.invalidateQueries({ queryKey: ['shipments', page] });
    handleCloseModal();
  };

  return (
    <>
      <button onClick={() => dialogRef.current?.showModal()}>+ Shipment</button>
      <dialog ref={dialogRef} className="create__shipment__modal">
        <div className="create__shipment__modal__close">
          <button onClick={handleCloseModal}>✖</button>
        </div>
        <div className="create__shipment__modal__content">
          <div className="create__shipment__modal__content__header">
            <h2>Shipping</h2>
            <p>Please enter your shipping details</p>
          </div>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="create__shipment__modal__content__form"
          >
            <div className="create__shipment__modal__content__form__group">
              <label
                htmlFor="first_name"
                data-validate={errors.first_name?.message}
                className={`field ${
                  errors.first_name && 'alert-validate alert-group'
                }`}
              >
                <span>First Name</span>
                <input
                  type="text"
                  id="first_name"
                  {...register('first_name')}
                />
              </label>
              <label
                htmlFor="last_name"
                data-validate={errors.last_name?.message}
                className={`field ${
                  errors.last_name && 'alert-validate alert-group'
                }`}
              >
                <span>Last Name</span>
                <input type="text" id="last_name" {...register('last_name')} />
              </label>
            </div>
            <label
              htmlFor="address"
              data-validate={errors.address?.message}
              className={`field ${errors.address && 'alert-validate'}`}
            >
              <span>Address</span>
              <input type="text" id="address" {...register('address')} />
            </label>
            <label
              htmlFor="country"
              data-validate={errors.country?.message}
              className={`field ${errors.country && 'alert-validate'}`}
            >
              <span>Country</span>
              <input type="text" id="country" {...register('country')} />
            </label>
            <div className="create__shipment__modal__content__form__group">
              <label
                htmlFor="zip_code"
                data-validate={errors.zip_code?.message}
                className={`field ${
                  errors.zip_code && 'alert-validate alert-group'
                }`}
              >
                <span>Zip Code</span>
                <input type="text" id="zip_code" {...register('zip_code')} />
              </label>
              <label
                htmlFor="city"
                data-validate={errors.city?.message}
                className={`field ${
                  errors.city && 'alert-validate alert-group'
                }`}
              >
                <span>City</span>
                <input type="text" id="city" {...register('city')} />
              </label>
              <label
                htmlFor="state"
                data-validate={errors.state?.message}
                className={`field ${
                  errors.state && 'alert-validate alert-group'
                }`}
              >
                <span>State</span>
                <input type="text" id="state" {...register('state')} />
              </label>
            </div>
            <button className="submit__btn">Create Shipment</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
