"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { reviewFormSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Editor } from "@tinymce/tinymce-react";
import { createReviews } from "@/lib/actions/reviews.action";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  userId: string;
  seriesId: string;
}

const ReviewForm = ({ userId, seriesId }: Props) => {
  const editorRef = React.useRef(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const path = usePathname();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof reviewFormSchema>) {
    try {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      // console.log({ values });
      createReviews({
        title: values.title,
        content: values.content,
        userId,
        seriesId,
        path,
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;

        editor.setContent("");
      }
      setIsSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err.message);
    } finally {
      setIsSubmitted(false);
      router.push(`/series/${seriesId}`);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
              onInit={(_evt, editor) => {
                // @ts-ignore
                editorRef.current = editor;
              }}
              onBlur={field.onBlur}
              onEditorChange={(content: string) => field.onChange(content)}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          )}
        />
        <Button type="submit">
          {isSubmitted === true ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ReviewForm;
