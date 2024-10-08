import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { ProjectValidationSchema } from "@/lib/validation";
import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/lib/react-query/queriesAndMutations";
import Loader from "../shared/Loader";

type ProjectFormProps = {
  project?: Models.Document;
  action: "Create" | "Update";
};

const ProjectForm = ({ project, action }: ProjectFormProps) => {
  const { toast } = useToast();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createProject, isPending: isLoadingCreate } =
    useCreateProjectMutation();

  const { mutateAsync: updateProject, isPending: isLoadingUpdate } =
    useUpdateProjectMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof ProjectValidationSchema>>({
    resolver: zodResolver(ProjectValidationSchema),
    defaultValues: {
      title: project ? project?.title : "",
      file: [],
      responsibilities: project ? project?.responsibilities : "",
      tags: project ? project?.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ProjectValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (project && action === "Update") {
      const updatedProject = await updateProject({
        ...values,
        projectId: project.$id,
        imageId: project?.imageId,
        imageUrl: project?.imageUrl,
      });
      if (!updatedProject) {
        toast({ title: "Unable to update. Please try again." });
      }
      return navigate(`/projects/${project.$id}`);
    }

    const newProject = await createProject({
      ...values,
      userId: user.id,
    });

    if (!newProject) {
      toast({ title: "Please try again." });
    }
    navigate("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Title</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="responsibilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Responsibilities
              </FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add image</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={project?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add tags (separate by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="JavaScript, TypeScript, React "
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action} Project
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
