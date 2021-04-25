import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

const processingOptions = {
  image: [
    {
      name: '90* Rotate',
      image_path: '/images/dataset/data/processing/img_level/ninety.jpg',
      preprocessingOnly: false,
      description: 'rotate',
    },
    {
      name: 'Shear',
      image_path: '/images/dataset/data/processing/img_level/shear.jpg',
      preprocessingOnly: false,
      description: 'Shear',
    },
    {
      name: 'GrayScale',
      image_path: '/images/dataset/data/processing/img_level/rgrayscale.jpg',
      preprocessingOnly: false,
      description: 'GrayScale',
    },
    {
      name: 'Hue',
      image_path: '/images/dataset/data/processing/img_level/hue.jpg',
      preprocessingOnly: false,
      description: 'Hue',
    },
    {
      name: 'Saturation',
      image_path: '/images/dataset/data/processing/img_level/saturation.jpg',
      preprocessingOnly: false,
      description: 'Saturation',
    },
    {
      name: 'Brightness',
      image_path: '/images/dataset/data/processing/img_level/brightness.jpg',
      preprocessingOnly: false,
      description: 'Brightness',
    },
    {
      name: 'Exposure',
      image_path: '/images/dataset/data/processing/img_level/exposure.jpg',
      preprocessingOnly: false,
      description: 'Exposure',
    },
    {
      name: 'Noise',
      image_path: '/images/dataset/data/processing/img_level/noise.jpg',
      preprocessingOnly: false,
      description: 'Noise',
    },
    {
      name: 'Contrast',
      image_path: '/images/dataset/data/processing/img_level/contrast.jpeg',
      preprocessingOnly: true,
      description: 'Contrast',
    },
    {
      name: 'Static Crop',
      image_path: '/images/dataset/data/processing/img_level/static-crop.jpeg',
      preprocessingOnly: true,
      description: 'Static Crop',
    },
    {
      name: 'Tile',
      image_path: '/images/dataset/data/processing/img_level/tile.jpeg',
      preprocessingOnly: true,
      description: 'Tile',
    },
  ],
  bbox: [
    {
      name: 'Flip',
      image_path: '/images/dataset/data/processing/bbox_level/bbflip.jpg',
      preprocessingOnly: false,
      description: 'Flip',
    },
    {
      name: '90* Rotate',
      image_path: '/images/dataset/data/processing/bbox_level/bbninety.jpg',
      preprocessingOnly: false,
      description: '90* Rotate',
    },
    {
      name: 'Crop',
      image_path: '/images/dataset/data/processing/bbox_level/bbcrop.jpg',
      preprocessingOnly: false,
      description: 'Crop',
    },
    {
      name: 'Shear',
      image_path: '/images/dataset/data/processing/bbox_level/bbshear.jpg',
      preprocessingOnly: false,
      description: 'Shear',
    },
    {
      name: 'Brightness',
      image_path: '/images/dataset/data/processing/bbox_level/bbbrightness.jpg',
      preprocessingOnly: false,
      description: 'Brightness',
    },
    {
      name: 'Noise',
      image_path: '/images/dataset/data/processing/bbox_level/bbnoise.jpg',
      preprocessingOnly: false,
      description: 'Noise',
    },
  ],
};

interface Props {
  variant: 'augmentation' | 'preprocessing' | null;
  show: boolean;
  close: () => void;
  onSelect: (processing: ProcessingStep) => void;
}

const AddProcessingModal: React.FC<Props> = ({
  variant,
  show,
  close,
  onSelect,
}) => {
  return (
    <Transition.Root show={show && !!variant} as={Fragment}>
      <Dialog
        as="div"
        static
        className="absolute z-10 inset-0"
        open={show && !!variant}
        onClose={close}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-32 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
              <button
                className="absolute top-3 right-3 rounded-full group"
                onClick={() => close()}
              >
                <XIcon className="w-6 h-6 group-hover:opacity-70" />
              </button>
              <h5 className="text-xl font-medium capitalize text-left">
                {variant} Options
              </h5>
              <div
                className="mt-6 overflow-y-scroll space-y-6"
                style={{ maxHeight: 'calc(100vh - 300px)' }}
              >
                {/* imgae level processings */}
                <div>
                  <h6 className="capitalize text-left text-lg text-gray-500">
                    Image level {variant}
                  </h6>
                  <ul className="mt-4 grid grid-cols-5 gap-4">
                    {processingOptions.image
                      .filter(
                        ({ preprocessingOnly }) =>
                          variant === 'preprocessing' || !preprocessingOnly,
                      )
                      .map(({ name, image_path, description }) => (
                        <li key={name}>
                          <button
                            className="group w-full"
                            type="button"
                            onClick={() => {
                              onSelect({
                                imageUrl: image_path,
                                name,
                                description,
                              });
                            }}
                          >
                            <div className="aspect-w-1 aspect-h-1 rounded-md shadow overflow-hidden">
                              <img
                                className="w-full h-full object-cover transform duration-300 transition-transform group-hover:scale-110 "
                                src={image_path}
                              />
                            </div>
                            <p>{name}</p>
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* bb level processings */}
                <div>
                  <h6 className="capitalize text-left text-lg text-gray-500">
                    Bounding box level {variant}
                  </h6>
                  <ul className="mt-4 grid grid-cols-5 gap-4">
                    {processingOptions.bbox
                      // .filter(
                      //   ({ preprocessingOnly }) =>
                      //     variant === 'preprocessing' || !preprocessingOnly,
                      // )
                      .map(({ name, image_path, description }) => (
                        <li key={name}>
                          <button
                            className="group w-full"
                            type="button"
                            onClick={() => {
                              onSelect({
                                imageUrl: image_path,
                                name,
                                description,
                              });
                            }}
                          >
                            <div className="aspect-w-1 aspect-h-1 rounded-md shadow overflow-hidden">
                              <img
                                className="w-full h-full object-cover transform duration-300 transition-transform group-hover:scale-110 "
                                src={image_path}
                              />
                            </div>
                            <p>{name}</p>
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddProcessingModal;
