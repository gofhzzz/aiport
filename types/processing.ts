export interface ProcessingStep {
  imageUrl: string;
  name: string;
  description: string;
}

export interface Processing {
  _id: string;
  templateName: string;
  templateType: string;
  augmentations: ProcessingStep[][];
  preprocessing: ProcessingStep[];
  created: string;
  lastUpdated: string;
}

export {};
