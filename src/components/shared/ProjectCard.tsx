import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import ProjectStats from "./ProjectStats";

type ProjectCardProps = {
  project: Models.Document;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { user } = useUserContext();

  if (!project.creator) return;
  console.log(project.responsibilities);
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${project.creator.$id}`}>
            <img
              src={
                project?.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {project.creator.name}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {multiFormatDateString(project.$createdAt)}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-project/${project.$id}`}
          className={`${user.id !== project.creator.$id && "hidden"}`}
        >
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </Link>
      </div>

      <Link to={`/projects/${project.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{project.title}</p>
          <p className="text-light-2 mt-3">{project.responsibilities}</p>

          <ul className="flex gap-1 mt-2">
            {project.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={project.imageUrl || "/assets/icons/profile-placeholder.svg"}
          className="post-card_img"
          alt="project image"
        />
      </Link>

      <ProjectStats project={project} userId={user.id} />
    </div>
  );
};

export default ProjectCard;
