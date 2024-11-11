import FirebaseService from "./FirebaseService";
import { CreateBlogDto, UpdateBlogDto } from "../dto/blog.dto";
const COLLECTION_NAME = "blogs";

class BlogService {
  static async createBlog(
    blog: CreateBlogDto
  ): Promise<FirebaseFirestore.DocumentData | undefined> {
    try {
      const blogCollection = await FirebaseService.getCollection(
        COLLECTION_NAME
      );
      const blogDoc = await blogCollection.add(blog);
      const createdBlog = await blogDoc.get();
      return createdBlog.data();
    } catch (error) {
      throw new Error(`Failed to create blog: ${error}`);
    }
  }

  static async getAll(): Promise<FirebaseFirestore.DocumentData[]> {
    try {
      const blogCollection = await FirebaseService.getCollection(
        COLLECTION_NAME
      );
      const blogDocs = await blogCollection.get();
      return blogDocs.docs.map((doc) => doc.data());
    } catch (error) {
      throw new Error(`Failed to get blogs: ${error}`);
    }
  }

  static async getBlogById(
    blogId: string
  ): Promise<FirebaseFirestore.DocumentData | undefined> {
    try {
      const blogCollection = await FirebaseService.getCollection(
        COLLECTION_NAME
      );
      const blogDoc = await blogCollection.doc(blogId).get();

      if (!blogDoc.exists) {
        throw new Error(`Blog with ID ${blogId} not found`);
      }

      return blogDoc.data();
    } catch (error) {
      throw new Error(`Failed to get blog: ${error}`);
    }
  }

  static async getUserPosts(
    userId: string
  ): Promise<FirebaseFirestore.DocumentData[]> {
    try {
      const blogCollection = await FirebaseService.getCollection(
        COLLECTION_NAME
      );
      const blogDocs = await blogCollection
        .where("authorId", "==", userId)
        .get();
      return blogDocs.docs.map((doc) => doc.data());
    } catch (error) {
      throw new Error(`Failed to get blogs by filter: ${error}`);
    }
  }

  static async updateBlog(
    blogId: string,
    blog: UpdateBlogDto
  ): Promise<FirebaseFirestore.DocumentData | undefined> {
    try {
      const blogCollection = await FirebaseService.getCollection(
        COLLECTION_NAME
      );

      // Check if blog exists before updating
      const existingBlog = await blogCollection.doc(blogId).get();
      if (!existingBlog.exists) {
        throw new Error(`Blog with ID ${blogId} not found`);
      }

      await blogCollection.doc(blogId).update(blog);
      const updatedBlog = await blogCollection.doc(blogId).get();
      return updatedBlog.data();
    } catch (error) {
      throw new Error(`Failed to update blog: ${error}`);
    }
  }

  static async deleteBlog(blogId: string): Promise<void> {
    try {
      const blogCollection = await FirebaseService.getCollection(
        COLLECTION_NAME
      );

      // Check if blog exists before deleting
      const existingBlog = await blogCollection.doc(blogId).get();
      if (!existingBlog.exists) {
        throw new Error(`Blog with ID ${blogId} not found`);
      }

      await blogCollection.doc(blogId).delete();
    } catch (error) {
      throw new Error(`Failed to delete blog: ${error}`);
    }
  }
}

export default BlogService;
