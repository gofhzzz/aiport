import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';

// components
import Button from '@components/ui/Button';
import SectionTitle from '@components/core/SectionTitle';
import { useUI } from '@components/ui/context';

// labraries
// import addToMyModelById from '@lib/Model/addToMyModelById';

// icons
import {
  ChevronDownIcon,
  EyeIcon,
  HeartIcon as FillHeartIcon,
  StarIcon,
} from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';

// types
import { ModelInfo } from 'types/model';

interface Props {
  className?: string;
  model: ModelInfo;
  otherModel: ModelInfo[];
}

const ModelDetail = ({ className, model, otherModel }: Props) => {
  const router = useRouter();
  const { showNoti, showModal, closeModal } = useUI();

  const [heartFlag, setHeartFalg] = React.useState<boolean>(false);

  // const handleAddToMyModel = React.useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     await addToMyModelById(model._id);
  //     showModal({
  //       title: 'Success',
  //       content: 'It has been added to your Model',
  //       actionButton: {
  //         label: 'Go to Model',
  //         onClick: () => {
  //           router.push(`/model/overview?modelId=${model._id}`);
  //           closeModal();
  //         },
  //       },
  //       cancelButton: {
  //         label: 'Stay in this page',
  //         onClick: () => closeModal(),
  //       },
  //     });
  //   } catch (err) {
  //     if (err.code === 101)
  //       showModal({
  //         variant: 'alert',
  //         title: 'Error',
  //         content: err.message,
  //         actionButton: {
  //           label: 'Go to Model',
  //           onClick: () => {
  //             router.push(`/model/overview?modelId=${model._id}`);
  //             closeModal();
  //           },
  //         },
  //         cancelButton: {
  //           label: 'Stay in this page',
  //           onClick: () => closeModal(),
  //         },
  //       });
  //     else showNoti({ title: 'Error', content: err.message, variant: 'alert' });
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [showNoti, model, showModal, closeModal, router]);

  return (
    <>
      <SectionTitle className="px-8" picture="/icon/model.png" title="Model" />
      <div className={cn(className, 'divide-y-2')}>
        <div className="flex py-4">
          <img
            src={model.src}
            className="object-contain w-80 h-80 rounded-md"
          />
          <div className="divide-y-2 px-4 w-full">
            <div className="flex justify-between pb-2 w-full">
              <p className="text-2xl font-semibold">{model.name}</p>
              <div className="flex">
                <div className="flex items-center ml-4">
                  <StarIcon color="orange" className="w-6 h-6" />
                  <p className="text-gray-600 pl-1">
                    {model.star.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center ml-4">
                  <EyeIcon className="w-6 h-6" color="gray" />
                  <p className="text-gray-600 pl-1">
                    {model.watch.toLocaleString()}
                  </p>
                </div>
                <button
                  className="flex items-center ml-2 text-red-600"
                  onClick={() => setHeartFalg((prev) => !prev)}
                >
                  {heartFlag ? (
                    <FillHeartIcon color="red" className="w-6 h-6" />
                  ) : (
                    <HeartIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex gap-4 py-4">
              <div className="w-[100px] space-y-2 text-md font-semibold">
                <p className="text-red-500">Price</p>
                <p>Owner</p>
                <p>Task</p>
                <p>Data Type</p>
                <p>Framework</p>
                <button className="w-full text-left items-center flex text-lightBlue-400 mt-2">
                  <p>See More</p>
                  <ChevronDownIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-2 text-md font-medium">
                <p className="text-red-500">
                  {model.isPublic ? 'FREE' : '120.65'}
                </p>
                <p>{model.owner}</p>
                <p>{model.task}</p>
                <p>{model.dataType}</p>
                <p>{model.framework}</p>
              </div>
            </div>
            <div>
              <p className="mt-2 text-lg font-semibold">About</p>
              <div className="line-clamp-4">{model.description}</div>
            </div>
          </div>
          <div className="w-96 ml-8 space-y-2">
            <Button
              onClick={() =>
                showModal({
                  title: 'Success',
                  content: 'It has been added to your Model',
                  actionButton: {
                    label: 'Go to Model',
                    onClick: () => {
                      router.push(`/model/overview`);
                      closeModal();
                    },
                  },
                  cancelButton: {
                    label: 'Stay in this page',
                    onClick: () => closeModal(),
                  },
                })
              }
              className="w-full"
            >
              Add to my Model
            </Button>
            <Button
              onClick={() =>
                showNoti({ title: '준비중인 기능입니다', variant: 'alert' })
              }
              className="w-full"
            >
              Download Source Code
            </Button>
            <Button
              onClick={() =>
                showNoti({ title: '준비중인 기능입니다', variant: 'alert' })
              }
              className="w-full"
            >
              Buy License
            </Button>
          </div>
        </div>
        <div className="py-4 overflow-x-scroll">
          <p className="mt-2 text-lg font-semibold">People also viewed</p>
          <div className="flex gap-16 pt-2">
            {otherModel.map((model, idx) => (
              <button
                className="w-36"
                key={`othermodel-${model._id}-${idx}`}
                onClick={() => {
                  showNoti({ title: '준비중인 기능입니다', variant: 'alert' });
                }}
              >
                <div className="relative w-36 h-36 overflow-hidden rounded-md">
                  <img
                    src={model.src}
                    className="inset-0 w-full h-full absolute object-cover rounded-md transform duration-300 hover:scale-110 overflow-hidden"
                  />
                </div>
                <p className="text-left">{model.name}</p>
                <div className="flex">
                  <div className="flex items-center">
                    <StarIcon color="orange" className="w-6 h-6" />
                    <p className="text-gray-600 pl-1">
                      {model.star.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center ml-4">
                    <EyeIcon className="w-6 h-6" color="gray" />
                    <p className="text-gray-600 pl-1">
                      {model.watch.toLocaleString()}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelDetail;
