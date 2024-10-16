import { useEffect, useState } from "react";
import axios from "axios";

const ContributorsPage = () => {
  const [contributors, setContributors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const repoOwner = "manikumarreddyu";
  const repoName = "AgroTech-AI";

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`
        );
        setContributors(response.data);
      } catch (error) {
        setError("Failed to load contributors. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchContributors();
  }, []);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  if (error)
    return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        GitHub Contributors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {contributors.map((contributor) => (
          <div
            key={contributor.id}
            className="p-4 bg-white shadow-lg rounded-lg flex flex-col items-center"
          >
            <img
              src={contributor.avatar_url}
              alt={contributor.login}
              className="w-20 h-20 rounded-full mb-4"
            />
            <h2 className="text-lg font-semibold">{contributor.login}</h2>
            <p className="text-gray-500">
              Contributions: {contributor.contributions}
            </p>
            <a
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributorsPage;
