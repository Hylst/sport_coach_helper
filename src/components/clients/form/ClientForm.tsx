import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Client, ClientFormData } from "@/types/client";
import { BasicInfo } from "./BasicInfo";
import { PersonalDetails } from "./PersonalDetails";
import { ProgramInfo } from "./ProgramInfo";
import { SessionsInfo } from "./SessionsInfo";
import { PriceInfo } from "./PriceInfo";
import { PhotoUpload } from "./PhotoUpload";
import { FormActions } from "./FormActions";
import * as z from "zod";
import { useEffect } from "react";

const clientFormSchema = z.object({
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  age: z.number().nullable(),
  birth_date: z.string().nullable(),
  registration_date: z.string(),
  program: z.string().nullable(),
  difficulties: z.string().nullable(),
  sessions_completed: z.number(),
  sessions_paid: z.number(),
  course_location: z.string().nullable(),
  notes: z.string().nullable(),
  price_per_session: z.number().nullable(),
  photo_url: z.string().nullable(),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

interface ClientFormProps {
  client?: Client;
  onSubmit: (data: ClientFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const ClientForm = ({ client, onSubmit, onCancel, isSubmitting }: ClientFormProps) => {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: null,
      phone: null,
      address: null,
      age: null,
      birth_date: null,
      registration_date: new Date().toISOString(),
      program: null,
      difficulties: null,
      sessions_completed: 0,
      sessions_paid: 0,
      course_location: null,
      notes: null,
      price_per_session: null,
      photo_url: null,
    },
  });

  useEffect(() => {
    if (client) {
      form.reset({
        first_name: client.first_name,
        last_name: client.last_name,
        email: client.email,
        phone: client.phone,
        address: client.address,
        age: client.age,
        birth_date: client.birth_date || null,
        registration_date: client.registration_date || new Date().toISOString(),
        program: client.program,
        difficulties: client.difficulties,
        sessions_completed: client.sessions_completed || 0,
        sessions_paid: client.sessions_paid || 0,
        course_location: client.course_location,
        notes: client.notes,
        price_per_session: client.price_per_session,
        photo_url: client.photo_url,
      });
    }
  }, [client, form]);

  const handleSubmit = (values: ClientFormValues) => {
    const formData: ClientFormData = {
      first_name: values.first_name,
      last_name: values.last_name,
      registration_date: values.registration_date,
      sessions_completed: values.sessions_completed,
      sessions_paid: values.sessions_paid,
      email: values.email,
      phone: values.phone,
      address: values.address,
      age: values.age,
      birth_date: values.birth_date,
      program: values.program,
      difficulties: values.difficulties,
      course_location: values.course_location,
      notes: values.notes,
      price_per_session: values.price_per_session,
      photo_url: values.photo_url,
    };
    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <PhotoUpload 
          photoUrl={form.watch("photo_url")} 
          onPhotoChange={(url) => form.setValue("photo_url", url)}
        />
        <BasicInfo form={form} />
        <PersonalDetails form={form} />
        <ProgramInfo form={form} />
        <SessionsInfo form={form} />
        <PriceInfo form={form} />
        <FormActions 
          onCancel={onCancel}
          isSubmitting={isSubmitting}
          isEditing={!!client}
        />
      </form>
    </Form>
  );
};