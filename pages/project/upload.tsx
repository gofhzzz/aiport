import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// components
import Dashboard from '@components/layout/Dashboard';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';

// libraries
import getSampleProjects from '@lib/ai/getSampleProjects';

// icons
import Spinner from '@components/icons/Spinner';
import TextArea from '@components/ui/TextArea';
import { ChevronRightIcon } from '@heroicons/react/outline';

// types
import {
  initialProjectInput,
  ProjectInput,
  SampleProjectInfo,
} from 'types/project';
import { useUI } from '@components/ui/context';
import ProjectCard from '@components/project/ProjectCard';

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
  const { showNoti } = useUI();

  useEffect(() => {
    getSampleProjects()
      .then((projects) => setSampleProjects(projects))
      .catch((err) => setError(err.message));
  }, []);

  const handleSubmit = useCallback(() => {
    setLoading(true);
    setTimeout(
      () =>
        router.push(`/project/overview/empty?projectName=${projectInput.name}`),
      500,
    );
  }, [router, projectInput]);

  if (error !== null) return <div>{error}</div>;

  return (
    <div className="relative mx-auto max-w-screen-xl pt-8 px-4 md:px-6 pb-16">
      <div className="w-full lg:grid gap-8 grid-cols-2 max-w-5xl mx-auto lg:px-16">
        <section className="md:my-8 px-4 py-6 w-full mx-auto sm:max-w-md lg:max-w-none h-[668px] md:border border-gray-300 md:rounded-md md:shadow-md md:bg-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium capitalize">New AI</h1>
          </div>

          <div className="flex flex-col justify-between h-full pb-8">
            <div>
              <div className="mt-8">
                <Input
                  containerClassName="my-4"
                  label="AI Name"
                  placeholder="My first AI"
                  value={projectInput.name}
                  onChange={(e) => {
                    setProjectInput((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>

              <TextArea
                value={projectInput.description}
                onChange={(e) => {
                  setProjectInput((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
                label="Description (Optional)"
                placeholder="Please enter a short description of this AI application"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <Button color="white" onClick={() => router.back()}>
                Back
              </Button>
              <Button
                disabled={!projectInput.name || loading}
                onClick={() => handleSubmit()}
              >
                Create
              </Button>
            </div>
          </div>
        </section>
        <section className="md:my-8 px-4 py-6 w-full mx-auto sm:max-w-md lg:max-w-none h-[668px] md:border border-gray-300 md:rounded-md md:shadow-md md:bg-white">
          <h1 className="text-xl font-medium">Clone AI (optional)</h1>
          <div className="flex-grow py-6 grid grid-cols-2 gap-4">
            {sampleProjects === null ? (
              <div className="h-[404px] flex justify-center items-center">
                <Spinner className="w-12 h-12 animate-spin" />
              </div>
            ) : (
              sampleProjects
                .slice(0, 4)
                .map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))
            )}
          </div>
          <button
            onClick={() =>
              showNoti({ title: '준비중인 기능입니다', variant: 'alert' })
            }
            className="mt-2 w-full flex items-center justify-end text-lightBlue-500 hover:opacity-80"
          >
            <p className="text-xl">Browse All AI projects</p>
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </section>
      </div>
      {/* new project form */}
    </div>
  );
};

ProjectUploadPage.Layout = Dashboard;
export default ProjectUploadPage;
