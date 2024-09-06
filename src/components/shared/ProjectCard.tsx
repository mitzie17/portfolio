import { Models } from "appwrite";
import { Link } from "react-router-dom";

type ProjectCardProps = {
  project: Models.Document;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
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
                {project.$createdAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
