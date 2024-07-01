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
import { createReviews, updateReview } from "@/lib/actions/reviews.action";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

interface Props {
  userId: string;
  seriesId: string;
  type: "create" | "edit";
  title?: string;
  content?: string;
  reviewId?: string;
}

const ReviewForm = ({
  userId,
  seriesId,
  reviewId,
  type,
  title,
  content,
}: Props) => {
  const editorRef = React.useRef(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const path = usePathname();
  const router = useRouter();
  const { theme } = useTheme();
  const skinMode = theme === "dark" ? "oxide-dark" : "oxide";
  const contentMode = theme === "dark" ? "dark" : "light";

  // 1. Define your form.
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      title: title || "",
      content: content || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof reviewFormSchema>) {
    try {
      setIsSubmitted(true);
      if (type === "create") {
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
      }

      if (type === "edit") {
        await updateReview({
          reviewId: reviewId!,
          title: values.title,
          content: values.content,
          path,
        });
      }
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
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
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
              id="reviewEditor"
              apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
              initialValue={content}
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
                skin: skinMode,
                content_css: contentMode,
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
