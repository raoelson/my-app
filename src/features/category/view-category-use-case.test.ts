import {
  InMemoryCategory,
  ViewCategoryUseCase,
} from "./view-category-use-case";

describe("Feat: category", () => {
  it("get all category", async () => {
    const useCase = new ViewCategoryUseCase(new InMemoryCategory());
    const reponses = await useCase.execute();
    expect(reponses[0].name).toEqual("Historical");
  });
});
