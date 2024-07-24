"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { editFormSchema } from "@/lib/validations";
import { updateUser } from "@/lib/actions/users.action";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface ReviewEditPageProps {
  accountInfo: any;
}

const AccountEditForm = ({ accountInfo }: ReviewEditPageProps) => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const path = usePathname();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      name: accountInfo.name || "",
      username: accountInfo.username || "",
      location: accountInfo.location || "",
      description: accountInfo.description || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof editFormSchema>) {
    try {
      toast({ title: "Edit success!" });
      setIsSubmitted(true);

      await updateUser({
        clerkId: accountInfo.clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          location: values.location,
          description: values.description,
        },
        path,
      });
    } catch (err: unknown) {
      toast({
        title: "There is an error!",
        description:
          "There was an error when attempting to edit your account profile",
        variant: "destructive",
      });
      if (err instanceof Error) console.error(err.message);
    } finally {
      setIsSubmitted(false);
      router.back();
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Full name <span className="text-primary-red">*</span>:
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitted}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-primary-red">*</span>:
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitted}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Location <span className="text-primary-red">*</span>:
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitted}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <span className="text-primary-red">*</span>:
              </FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitted}
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[98px] resize-none border"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitted}
          type="submit"
          className="rounded-lg border-white px-3 py-2"
        >
          {isSubmitted ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default AccountEditForm;
