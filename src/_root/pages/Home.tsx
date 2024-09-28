import { Models } from "appwrite";

import Loader from "@/components/shared/Loader";
import ProjectCard from "@/components/shared/ProjectCard";
import { useGetRecentProjectsMutation } from "@/lib/react-query/queriesAndMutations";

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
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isProjectLoading && !projects ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {projects?.documents.map((project: Models.Document) => (
                <li key={project.$id} className="flex justify-center w-full">
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
