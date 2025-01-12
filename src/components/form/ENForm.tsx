import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface ENFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  defaultValues?: Partial<T>;
  children: React.ReactNode;
  className?: string;
  label?: string;
  isLoading?: boolean;
}

const ENForm = <T extends FieldValues>({
  onSubmit,
  defaultValues = {},
  children,
  className = "",
  label,
  isLoading,
}: ENFormProps<T>): JSX.Element => {
  const methods = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmitAndReset = async (data: T) => {
    // Call the onSubmit handler
    await onSubmit(data);

    // Reset the form after submission
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitAndReset)}
        className={`space-y-4 ${className}`}
      >
        {children}
        <div className="flex justify-center">
          {isLoading ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <button
              type="submit"
              className={`rounded-full px-4 py-2 text-white ${
                label ? "" : "hidden"
              } bg-[#81BA00]`}
            >
              {label}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default ENForm;
