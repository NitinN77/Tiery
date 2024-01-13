"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadImages } from "@/lib/actions/upload-images"
import { useEffect, useRef } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { toast } from "sonner"

export default function CreateTemplate() {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(uploadImages, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.message === "Uploaded images") {
      toast("Template created and images uploaded successfully!")
    }
  }, [state])

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <form
        ref={formRef}
        action={async (formData) => {
          formRef.current?.reset()
          dispatch(formData)
        }}
      >
        <Input type="text" name="templateName" placeholder="Template Name" />
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.templateName &&
            state.errors.templateName.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        <br />
        <Label htmlFor="pictures" className="font-semibold">
          Select pictures to upload
        </Label>
        <br />
        <Input id="pictures" name="pictures" type="file" multiple />
        {state.errors?.pictures &&
          state.errors.pictures.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        <br />
        <SubmitButton />
      </form>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      Upload
    </Button>
  )
}
