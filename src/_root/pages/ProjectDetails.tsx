import ProjectStats from "@/components/shared/ProjectStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetProjectById } from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data: project, isPending } = useGetProjectById(id || "");
  const { user } = useUserContext();

  const handleDeleteProject = () => {};

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={project?.imageUrl}
            alt="post"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${project?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    project?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-8 lg:h-8 lg:w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {project?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(project?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {project?.title}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center">
                <Link
                  to={`/update-project/${project?.$id}`}
                  className={`${user.id !== project?.creator.$id && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    width={24}
                    height={24}
                    alt="edit"
                  />
                </Link>

                <Button
                  onClick={handleDeleteProject}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${
                    user.id !== project?.creator.$id && "hidden"
                  }`}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80"></hr>

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{project?.title}</p>

              <ul className="flex gap-1 mt-2">
                {project?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>

              <p className="text-light-2 mt-1 text-center">
                {project?.responsibilities}
              </p>
            </div>

            <div className="w-full">
              <ProjectStats project={project} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
