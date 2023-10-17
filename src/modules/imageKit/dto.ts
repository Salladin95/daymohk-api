class ExtensionStatus {
  'google-auto-tagging': string;
  'aws-auto-tagging': string;
}

class EmbeddedMetadata {
  Title: string;
  Description: string;
  State: string;
  Copyright: string;
}

class CustomMetadata {
  brand: string;
  color: string;
}

class VersionInfo {
  id: string;
  name: string;
}

class AITag {
  name: string;
  confidence: number;
  source: string;
}

export class UploadFileResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  height: number;
  width: number;
  size: number;
  filePath: string;
  tags: string[];
  AITags: AITag[];
  versionInfo: VersionInfo;
  isPrivateFile: boolean;
  customCoordinates?: any;
  customMetadata: CustomMetadata;
  embeddedMetadata: EmbeddedMetadata;
  extensionStatus: ExtensionStatus;
  fileType: string;
}
