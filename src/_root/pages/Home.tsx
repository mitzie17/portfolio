import Loader from "@/components/shared/Loader";
import ProjectCard from "@/components/shared/ProjectCard";
import { useGetRecentProjectsMutation } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

export const Home = () => {
  const {
    data: projects,
    isPending: isProjectLoading,
    isError: isErrorProjects,
  } = useGetRecentProjectsMutation();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="n3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isProjectLoading && !projects ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {projects?.documents.map((project: Models.Document) => (
                <ProjectCard project={project} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
