import {
  IMuseumRepository,
  ViewMuseumUseCase,
  queryType,
} from "./view-museum-use-case";

describe("Feature: Museum", () => {
  let viewMuseumUseCase: ViewMuseumUseCase;

  beforeAll(() => {
    viewMuseumUseCase = new ViewMuseumUseCase(new InMemoryMuseum());
  });

  it("get all museum", async () => {
    const query = {};
    const responses = await viewMuseumUseCase.execute(query);
    expect(responses[0].id).toEqual("M0015");
  });
  it("get museum by name", async () => {
    const query = {
      name: "musée historique",
    };
    const responses = await viewMuseumUseCase.execute(query);
    expect(responses[0].id).toEqual("M0020");
    expect(responses[0].name).toEqual("musée historique");
  });
  it("get museum by category name", async () => {
    const query = {
      category: "Archéologie nationale",
    };
    const responses = await viewMuseumUseCase.execute(query);
    expect(responses[0].id).toEqual("M0015");
  });
});

export class InMemoryMuseum implements IMuseumRepository {
  getMuseums(query: queryType): Promise<any> {
    const { name, category } = query;

    const data = MOCK.filter((item) => {
      const nameMatches = name ? item.name.includes(name) : true;
      const categoryMatches = category
        ? item.categories.some((item) => item.name === category)
        : true;
      return nameMatches && categoryMatches;
    });
    return Promise.resolve(data);
  }
}

const MOCK = [
  {
    id: "M0015",
    name: "musée archéologique",
    history:
      "Création en 1855 par la Société pour la conservation des Monuments historiques d'Alsace (SCMHA) ;  1870 : destruction complète lors de la Guerre franco-prussienne ; à partir de 1871 : recréation des collections et installation au palais Rohan en 1896 ; 1909 à 1939 : gestion du musée par Robert Forrer, pour la Société pour la conservation des Monuments historiques d'Alsace : nombreuses fouilles et enrichissement considérable des collections ; 1946 : donation du musée par la SCMHA à la Ville de Strasbourg (devient musée classé en octobre 1946) ; 1946 à 1981 : gestion par Jean-Jacques Hatt, directeur des Antiquités historiques d'Alsace et professeur à l'Université de Strasbourg : nombreuses fouilles à Strasbourg et sites romains régionaux et enrichissement important des collections gallo-romaines ; 1988 à 1992 : réaménagement muséographique complet. Les collections médiévales sont déposées au musée historique.",
    is_remarkable_for:
      "Collections néolithiques présentant l'ensemble des civilisations entre - 5800 et -2000 ;  collections de protohistoire : Ages du Bronze et du Fer ; très importante section gallo-romaine ; collections mérovingiennes.",
    interest:
      "Palais Rohan, construit de 1739 à 1742 par Robert de Cotte pour le cardinal Armand Gaston de Rohan-Soubise. De style classique, le palais est édifié selon l'ordonnance habituelle de l'hôtel parisien entre cour et jardin.",
    address: {
      line1: "2 place du château",
      line2: "",
      postal_code: "67000",
      city: "Strasbourg",
      state: "Bas-Rhin",
      country: "France",
    },
    phoneNumber: "03 68 98 74 90",
    website: "www.musees.strasbourg.eu/musee-archeologique",
    coordinates: {
      lon: 7.751984,
      lat: 48.581229,
    },
    categories: [
      {
        id: 1,
        name: "Antiquités étrangères",
      },
      {
        id: 2,
        name: "Archéologie nationale",
      },
    ],
    distance: null,
  },
  {
    id: "M0020",
    name: "musée historique",
    history:
      "En 1919, un appel est lancé auprès des Strasbourgeois et des achats sont effectués. De 1935 à 2018, les collections se sont enrichies grâce à des donations (principalement) et à des achats.",
    is_remarkable_for:
      "Logé depuis 1920 dans l'Ancienne Boucherie (1587), le musée a pour mission d'évoquer l'histoire du cadre urbain ainsi que l'histoire politique, économique et sociale de Strasbourg, au moyen de maquettes dont le plan - relief de 1725- 1727 (la ville est reproduite au 1/600e), d'un ensemble de peintures, de dessins, de gravures et de lithographies, d'une collection d'objets militaires (armes et uniformes de 1500 à 1945), d'objets très divers allant du chef-d'œuvre corporatif aux souvenirs de grands hommes, par exemple le général Kléber, ou de simples citoyens (costumes, mobilier, etc.) et de collections archéologiques allant du moyen âge au XVIIIe siècle.",
    interest: "Ancienne Boucherie de 1588.",
    address: {
      line1: "2 rue du vieux marché aux poissons",
      line2: "",
      postal_code: "67000",
      city: "Strasbourg",
      state: "Bas-Rhin",
      country: "France",
    },
    phoneNumber: "03 68 98 50 00",
    website: "www.musees.strasbourg.eu/musee-historique",
    coordinates: {
      lon: 7.749714,
      lat: 48.580579,
    },
    categories: [
      {
        id: 2,
        name: "Archéologie nationale",
      },
      {
        id: 3,
        name: "Collections militaires",
      },
      {
        id: 4,
        name: "Histoire",
      },
    ],
    distance: null,
  },
  {
    id: "M0022",
    name: "musée Westercamp",
    history:
      "Créé et inauguré en 1913, le musée possède des collections données et léguées par les fondateurs, enrichies au fil des années par des dons individuels et par des achats, telle la collection de lithographies wissembourgoises Wentzel et succ. en 1991, comportant 600 pièces.",
    is_remarkable_for:
      "Une petite section archéologique présente stèles romaines et objets de la vie quotidienne.  Le Moyen Age est illustré par des sculptures et divers éléments d'architecture.  Le passé militaire est présent également : plans des \"lignes de défense de la Lauter\", uniformes du Second Empire, collections d'armes blanches et d'armes à feu, souvenirs du 87e Régiment d'infanterie.  La vie quotidienne, l'imagerie populaire (Wentzel) font l'objet d'une section avec un ensemble de mobilier et de costumes en usage dans la région du XVIIIe au début du XIXe siècles.",
    interest:
      "Grande maison bourgeoise du XVIe siècle à colombages, sans doute ancien siège d'une exploitation viticole en 1599. La façade principale sur rue est rehaussée d'un oriel rectangulaire, d'une grande lucarne et ornée de décors sculptés Renaissance à thème viticole. La façade sur cour comporte une galerie et un puits.",
    address: {
      line1: "1-3 rue du musée",
      line2: "",
      postal_code: "67160",
      city: "Wissembourg",
      state: "Bas-Rhin",
      country: "France",
    },
    phoneNumber: "03 88 54 28 14",
    website: "webmuseo.com/ws/musee-wissembourg/app/report/index.html",
    coordinates: {
      lon: 7.944344,
      lat: 49.038815,
    },
    categories: [
      {
        id: 2,
        name: "Archéologie nationale",
      },
      {
        id: 5,
        name: "Art religieux (Art chrétien, objets judaïques de la vie quotidienne)",
      },
      {
        id: 6,
        name: "Arts décoratifs",
      },
      {
        id: 7,
        name: "Beaux-Arts",
      },
      {
        id: 8,
        name: "Civilisations extra-européennes",
      },
      {
        id: 3,
        name: "Collections militaires",
      },
      {
        id: 9,
        name: "Photographie, Numismatique",
      },
      {
        id: 10,
        name: "Ethnologie",
      },
      {
        id: 4,
        name: "Histoire",
      },
      {
        id: 11,
        name: "Musique",
      },
      {
        id: 12,
        name: "Sciences et techniques (Imagerie populaire)",
      },
    ],
    distance: null,
  },
];
