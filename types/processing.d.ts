interface ProcessingStep {
  imageUrl: string;
  name: string;
  description: string;
}

interface Processing {
  _id: string;
  templateName: string;
  templateType: string;
  augmentations: ProcessingStep[][];
  preprocessing: ProcessingStep[];
  created: Date;
  lastUpdated: Date;
}
