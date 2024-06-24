import {
  Dimensions,
  FlatList,
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { museumModule } from "../museum.module";
import { FC, useEffect, useMemo, useState } from "react";
import { MuseumDomain } from "../view-museum-use-case";
import { CategoryDomain } from "../../category/view-category-use-case";
import { categoryModule } from "../../category/category.module";
import CategorySelect from "../../category/ui/CategorySelect";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const [items, setItems] = useState<MuseumDomain[]>([]);
  const [categories, setCategories] = useState<CategoryDomain[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    fetchMuseums();
    fetchCategories();
  }, [search, category]);

  const fetchMuseums = async () => {
    try {
      const query = {
        name: search,
        categoryId: category,
      };
      const responses = await museumModule.getMuseums(query);
      setItems(responses);
    } catch (error) {
      console.error("Error fetching museums:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const responses = await categoryModule.getCategories();
      setCategories(responses);
    } catch (error) {
      console.error("Error fetching museums:", error);
    }
  };

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        label: category.name,
        value: category.name,
      })),
    [categories]
  );

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CategorySelect
        value={category}
        onChange={setCategory}
        options={categoryOptions}
      />
      <SearchInput value={search} onChange={handleSearch} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MuseumCard item={item} />}
      />
    </SafeAreaView>
  );
}

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};
export const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Museum"
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
};

type MuseumCardProps = {
  item: MuseumDomain;
};
export const MuseumCard: FC<MuseumCardProps> = ({ item }) => {
  return (
    <View style={styles.items}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.history}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },
  flatList: {
    backgroundColor: "transparent",
  },

  items: {
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 140,
    width: screenWidth * 0.9,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  item: {
    padding: 16,
    maxHeight: 120,
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 14,
  },

  searchContainer: {
    zIndex: 2,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
});
