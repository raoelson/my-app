import {
  MuseumRepository,
  ViewMuseumUseCase,
  queryType,
} from "./view-museum-use-case";

const repository = new MuseumRepository();
export const museumModule = {
  getMuseums: async (query: queryType) => {
    const useCase = new ViewMuseumUseCase(repository);
    return await useCase.execute(query);
  },
};
