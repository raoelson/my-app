import {
  CategoryRepository,
  ViewCategoryUseCase,
} from "./view-category-use-case";

export const categoryModule = {
  getCategories: () => {
    const useCase = new ViewCategoryUseCase(new CategoryRepository());
    return useCase.execute();
  },
};
