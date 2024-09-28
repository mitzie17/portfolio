import ProjectForm from "@/components/forms/ProjectForm";
import { useGetProjectById } from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

const EditProject = () => {
  const { id } = useParams();
  const { data: project, isPending } = useGetProjectById(id || "");

  if (isPending) return <Loader />;

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img src="/assets/icons/edit.svg" width={36} height={36} alt="edit" />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Project</h2>
        </div>

        <ProjectForm action="Update" project={project} />
      </div>
    </div>
  );
};

export default EditProject;
