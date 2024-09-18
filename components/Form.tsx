'use client'

import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema, type FormValues } from '@/types/schema'
import { createPost } from '@/lib/actions.listing'
import { UploadButton } from '@/lib/uploadthing'
import { useRouter } from 'next/navigation'

export default function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createPost(data)
    router.push('/profile')
  }

  function InputFieldError({ text = '' }: { text?: string }) {
    return <p className="text-red-500">{text}</p>
  }

  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" {...register('title')} />
        {errors.title && <InputFieldError text={errors.title.message} />}
      </div>

      <div>
        <label htmlFor="address">Address</label>
        <input id="address" {...register('address')} />
        {errors.address && <InputFieldError text={errors.address.message} />}
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
        />
        {errors.price && <InputFieldError text={errors.price.message} />}
      </div>

      <div>
        <label htmlFor="latitude">Latitude</label>
        <input
          id="latitude"
          type="number"
          step="0.01"
          {...register('latitude', { valueAsNumber: true })}
        />
        {errors.latitude && <InputFieldError text={errors.latitude.message} />}
      </div>

      <div>
        <label htmlFor="longitude">Longitude</label>
        <input
          id="longitude"
          type="number"
          step="0.01"
          {...register('longitude', { valueAsNumber: true })}
        />
        {errors.longitude && (
          <InputFieldError text={errors.longitude.message} />
        )}
      </div>

      <div>
        <label htmlFor="bedroom_no">Bedroom Number</label>
        <input
          id="bedroom_no"
          type="number"
          {...register('bedroom_no', { valueAsNumber: true })}
        />
        {errors.bedroom_no && (
          <InputFieldError text={errors.bedroom_no.message} />
        )}
      </div>

      <div>
        <label htmlFor="bathroom_no">Bathroom Number</label>
        <input
          id="bathroom_no"
          type="number"
          {...register('bathroom_no', { valueAsNumber: true })}
        />
        {errors.bathroom_no && (
          <InputFieldError text={errors.bathroom_no.message} />
        )}
      </div>

      <div>
        <label htmlFor="wifi_available">Wi-Fi Available</label>
        <input
          id="wifi_available"
          type="checkbox"
          {...register('wifi_available')}
        />
      </div>

      <div>
        <label htmlFor="watersupply_available">Water Supply Available</label>
        <input
          id="watersupply_available"
          type="checkbox"
          {...register('watersupply_available')}
        />
      </div>

      <div>
        <label htmlFor="close_to">Close To</label>
        <select id="close_to" {...register('close_to')}>
          <option value="west">West</option>
          <option value="main">Main</option>
          <option value="both">Both</option>
        </select>
        {errors.close_to && <InputFieldError text={errors.close_to.message} />}
      </div>

      <div>
        <label htmlFor="owner_name">Owner Name</label>
        <input id="owner_name" {...register('owner_name')} />
        {errors.owner_name && (
          <InputFieldError text={errors.owner_name.message} />
        )}
      </div>

      <div>
        <label htmlFor="owner_contact">Owner Contact</label>
        <input id="owner_contact" {...register('owner_contact')} />
        {errors.owner_contact && (
          <InputFieldError text={errors.owner_contact.message} />
        )}
      </div>

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log(res)
          setValue(
            'images',
            res.map((item) => item?.url)
          )
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`)
        }}
      />
      {errors.images && <InputFieldError text={errors.images.message} />}
      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
