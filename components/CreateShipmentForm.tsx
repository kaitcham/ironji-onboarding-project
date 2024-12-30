'use client';
import { useRef } from 'react';

export default function CreateShipmentForm() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button onClick={() => dialogRef.current?.showModal()}>+ Shipment</button>
      <dialog ref={dialogRef} className="create__shipment__modal">
        <div className="create__shipment__modal__close">
          <button onClick={() => dialogRef.current?.close()}>✖</button>
        </div>
        <div className="create__shipment__modal__content">
          <div className="create__shipment__modal__content__header">
            <h2>Shipping</h2>
            <p>Please enter your shipping details</p>
          </div>
          <form className="create__shipment__modal__content__form">
            <div className="create__shipment__modal__content__form__group">
              <label htmlFor="first_name" className="field">
                <span>First Name</span>
                <input type="text" id="first_name" name="first_name" />
              </label>
              <label htmlFor="last_name" className="field">
                <span>Last Name</span>
                <input type="text" id="last_name" name="last_name" />
              </label>
            </div>
            <label htmlFor="address" className="field">
              <span>Address</span>
              <input type="text" id="address" name="address" />
            </label>
            <label htmlFor="country" className="field">
              <span>Country</span>
              <input type="text" id="country" name="country" />
            </label>
            <div className="create__shipment__modal__content__form__group">
              <label htmlFor="zip_code" className="field">
                <span>Zip Code</span>
                <input type="text" id="zip_code" name="zip_code" />
              </label>
              <label htmlFor="city" className="field">
                <span>City</span>
                <input type="text" id="city" name="city" />
              </label>
              <label htmlFor="state" className="field">
                <span>State</span>
                <input type="text" id="state" name="state" />
              </label>
            </div>
            <button className="submit__btn">Create Shipment</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
