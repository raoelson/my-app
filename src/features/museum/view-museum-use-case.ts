export type MuseumDomain = {
  id: string;
  name: string;
  history: string;
  is_remarkable_for: string;
  interest: string;
  address: {
    line1: string;
    line2: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
  };
  phoneNumber: string;
  website: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  categories: {
    id: number;
    name: string;
  }[];
  distance: string | undefined;
};

export type queryType = {
  name?: string;
  category?: string;
};

export interface IMuseumRepository {
  getMuseums(query: queryType): Promise<MuseumDomain[]>;
}

export class ViewMuseumUseCase {
  constructor(private readonly repository: IMuseumRepository) {}

  async execute(query: queryType): Promise<MuseumDomain[]> {
    return this.repository.getMuseums(query);
  }
}

const apiUrl = "https://museum-api.fly.dev";
export class MuseumRepository implements IMuseumRepository {
  async getMuseums(query: queryType): Promise<MuseumDomain[]> {
    try {
      const { name, category } = query;
      const url = new URL(`${apiUrl}/museums`);
      if (name) {
        url.searchParams.append("q", name);
      }
      if (category) {
        url.searchParams.append("category", category);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();

      return data.museums;
    } catch (error) {
      console.error("Failed to fetch museums:", error);
      throw error;
    }
  }
}
