import { ReactNode } from "react"
// form
import { FormProvider as Form, UseFormReturn } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode
  methods: UseFormReturn<any>
  onSubmit?: (formValue: any) => any
}

export default function FormProvider({ children, onSubmit, methods }: Props) {
  return (
    <Form {...methods}>
      <DevTool control={methods.control} /> {/* set up the dev tool */}
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  )
}
