// types/notion.ts

// Types for conversation data
export interface ConversationItem {
    type: 'question' | 'answer';
    text: string;
  }
  
  export interface ContactFormData {
    conversation: ConversationItem[];
    email?: string;
    source?: string;
  }
  
  export interface ExtractedInfo {
    topic?: string;
    challenge?: string;
    obstacle?: string;
    name?: string;
    extractedEmail?: string;
  }
  
  // Notion API specific types
  export interface NotionRichText {
    text: {
      content: string;
    };
    annotations?: {
      bold?: boolean;
      italic?: boolean;
      strikethrough?: boolean;
      underline?: boolean;
      code?: boolean;
      color?: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red" | "default_background" | "gray_background" | "brown_background" | "orange_background" | "yellow_background" | "green_background" | "blue_background" | "purple_background" | "pink_background" | "red_background";
    };
  }
  
  export interface NotionBlock {
    object: 'block';
    type: string;
    [key: string]: any; // This allows for different block types
  }
  
  export interface NotionHeading2Block extends NotionBlock {
    type: 'heading_2';
    heading_2: {
      rich_text: NotionRichText[];
    };
  }
  
  export interface NotionParagraphBlock extends NotionBlock {
    type: 'paragraph';
    paragraph: {
      rich_text: NotionRichText[];
    };
  }
  
  // API response interfaces
  export interface SuccessResponse {
    success: true;
    id: string;
  }
  
  export interface ErrorResponse {
    error: string;
    details?: string;
  }