import React from 'react';
// import cn from 'classnames';

// components
import Common from '@components/layout/Common';
import Button from '@components/ui/Button';
import useUser from '@lib/useUser';

const features = [
  {
    title: 'Where the world builds AI',
    content: "Focus on your data and model, we'll take care of the rest",
    image_path: '/images/home/img1.png',
  },
  {
    title: 'Scalable',
    content:
      'Enterprise-ready ML, built for rapid experimentation, reusable ML components, and production-ready infrastructure',
    image_path: '/images/home/img2.png',
  },
  {
    title: 'Collaborative',
    content:
      'Unify data science teams with a clear and collaborative management environment. Build a repository of ML components for easy reproducibility.',
    image_path: '/images/home/img3.png',
  },
  {
    title: 'End to End',
    content:
      'Automate, track and monitor your ML workflow from research to production',
    image_path: '/images/home/img4.png',
  },
  {
    title: 'Flexible',
    content:
      'Use any language, AI framework, and compute environment. Integrate and version any kind of data to reuse in any project, experiment, and/or notebook',
    image_path: '/images/home/img5.png',
  },
  {
    title: 'Interactive',
    content:
      'Use any development environment like JupyterLab, RStudio, and more with pre-installed dependencies and version control',
    image_path: '/images/home/img6.png',
  },
];

const IndexPage = () => {
  useUser({ redirectTo: '/dashboard', redirectIfFound: true });
  return (
    <div>
      <div className="bg-lightBlue-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            <span className="block">Where the world builds AI</span>
            <span className="block text-lightBlue-600 mt-4">
              Focus on your data and model,
              <br />
              we’ll take care of the rest.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button>Start for free</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative bg-white py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <h2 className="text-base font-semibold tracking-wider text-lightBlue-600 uppercase">
            Deploy faster
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Everything you need to deploy your app
          </p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
            Phasellus lorem quam molestie id quisque diam aenean nulla in.
            Accumsan in quis quis nunc, ullamcorper malesuada. Eleifend
            condimentum id viverra nulla.
          </p>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 shadow h-full">
                    <div className="-mt-10">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-white rounded-md shadow-lg">
                          <img
                            className="h-16 w-auto"
                            src={feature.image_path}
                            loading="lazy"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

IndexPage.Layout = Common;
export default IndexPage;
