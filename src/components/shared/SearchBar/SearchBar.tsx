"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/validations";
import Image from "next/image";

function SearchBar({ placeHolder }: { placeHolder: string }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex w-full max-w-full cursor-pointer items-center gap-x-6">
                  <Image
                    src={"/assets/icon-search.svg"}
                    alt="Search Icon"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                  <Input
                    type="text"
                    placeholder={placeHolder}
                    className="no-focus primary-font-color-pureWhite-pureBlack border-none shadow-none outline-none focus:border-b focus:border-b-white"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
}

export default SearchBar;
