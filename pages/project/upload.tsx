import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { EyeIcon, HeartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';

// components
import Dashboard from '@components/layout/Dashboard';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Link from '@components/ui/Link';

// libraries
import getSampleProjects from '@lib/ai/getSampleProjects';

// icons
import Spinner from '@components/icons/Spinner';
import TextArea from '@components/ui/TextArea';

// types
import {
  initialProjectInput,
  ProjectInput,
  SampleProjectInfo,
} from 'types/project';

const ProjectUploadPage = () => {
  const router = useRouter();
  const [sampleProjects, setSampleProjects] = useState<
    SampleProjectInfo[] | null
  >(null);
  const [projectInput, setProjectInput] = useState<ProjectInput>(
    initialProjectInput,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getSampleProjects()
      .then((projects) => setSampleProjects(projects))
      .catch((err) => setError(err.message));
  }, []);

  const handleSubmit = useCallback(() => {
    setLoading(true);
    setTimeout(() => router.push('/project/overview'), 500);
  }, [router]);

  if (error !== null) return <div>{error}</div>;

  return (
    <div className="relative mx-auto max-w-screen-xl pt-8 px-4 md:px-6 pb-16">
      <h1 className="text-3xl font-medium">New Project</h1>

      {/* new project form */}
      <section className="mt-8">
        <div className="rounded-md shadow-md bg-white p-4 sm:p-6 md:flex md:space-x-6 justify-between items-end max-w-lg mx-auto md:max-w-none">
          <div className="flex-1">
            <h2 className="text-xl font-medium">Create Empty Project</h2>
            <Input
              containerClassName="my-4"
              label="Project Name"
              placeholder="My first project"
              value={projectInput.name}
              onChange={(e) => {
                setProjectInput((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
            <TextArea
              value={projectInput.description}
              onChange={(e) => {
                setProjectInput((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
              label="Description (Optional)"
              placeholder="lease enter a short description of this application ..."
            />
          </div>
          <div className="mt-4 flex items-center justify-end">
            <Button
              disabled={!projectInput.name || loading}
              onClick={() => handleSubmit()}
            >
              Create
            </Button>
          </div>
        </div>
      </section>

      {/* clone project section */}
      <section className="mt-8">
        <div className="rounded-md shadow-md bg-white p-4 sm:p-6 max-w-lg mx-auto md:max-w-none">
          <h2 className="text-xl font-medium">Clone Project (optional)</h2>

          {sampleProjects === null ? (
            <div className="h-[404px] flex justify-center items-center">
              <Spinner className="w-12 h-12 animate-spin" />
            </div>
          ) : (
            <div className="md:py-6 gap-6 grid-cols-2 md:grid lg:grid-cols-3 lg:gap-10 max-w-screen-xl mx-auto">
              {sampleProjects.map((project, idx) => (
                <Link
                  key={project._id}
                  className="rounded-md overflow-hidden shadow-md group flex flex-col my-6 md:my-0"
                  href="/project/overview"
                >
                  <div className="relative aspect-w-16 aspect-h-7 overflow-hidden">
                    <img
                      className="object-cover transform duration-300 transition-transform group-hover:scale-110"
                      src={`/images/project/sample/clone_cover_${idx + 1}.jpg`}
                      loading="lazy"
                    />
                  </div>
                  <div className="px-4 flex-grow flex flex-col justify-center min-h-[128px]">
                    <h5 className="mt-2 pb-2 text-center font-semibold border-b-2 border-gray-300">
                      {project.name}
                    </h5>
                    <p className="mt-2 text-sm truncate">
                      Task: {project.task}
                    </p>
                    <div className="mt-1.5 flex space-x-3 text-gray-500 text-sm">
                      <div className="flex items-center space-x-1">
                        <EyeIcon className="w-5 h-5" />
                        <span>{project.watch.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <StarIcon className="w-5 h-5" />
                        <span>{project.star.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-300 py-1.5 flex justify-between items-center px-4">
                    <HeartIcon className="w-5 h-5 text-red-400" />
                    <span className="text-sm">Free</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="pb-8 md:pb-4">
            <Link
              className="float-right text-lightBlue-400 hover:underline hover:opacity-70"
              href="/marketplace?sort=project"
              as="/marketplace"
            >
              Browse all AI projects &gt;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

ProjectUploadPage.Layout = Dashboard;
export default ProjectUploadPage;
