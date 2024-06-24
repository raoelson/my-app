export type CategoryDomain = {
  id: number;
  name: string;
};
export interface ICategory {
  getCategories(): Promise<CategoryDomain[]>;
}
export class ViewCategoryUseCase {
  constructor(readonly repository: ICategory) {}

  execute(): Promise<CategoryDomain[]> {
    return this.repository.getCategories();
  }
}

export class InMemoryCategory implements ICategory {
  getCategories(): Promise<CategoryDomain[]> {
    const data = [
      {
        id: 1,
        name: "Historical",
      },
      {
        id: 2,
        name: "Landmark",
      },
      {
        id: 3,
        name: "Monument",
      },
    ];

    return Promise.resolve(data);
  }
}

const apiUrl = "https://museum-api.fly.dev";
export class CategoryRepository implements ICategory {
  async getCategories(): Promise<CategoryDomain[]> {
    if (!apiUrl) {
      throw new Error("API URL is not defined");
    }

    try {
      const url = new URL(`${apiUrl}/categories`);
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();

      return data.categories;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  }
}
