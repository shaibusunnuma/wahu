export interface CreateBlogDto {
  authorId: string;
  title: string;
  content: string;
}


export type UpdateBlogDto = {
  title?: string;
  content?: string;
};
