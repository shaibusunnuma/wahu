export interface createPostDto {
  authorId: string;
  title: string;
  content: string;
}


export type updatePostDto = {
  title?: string;
  content?: string;
};
