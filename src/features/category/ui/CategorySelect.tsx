import { FC } from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect, { Item } from "react-native-picker-select";

type CategorySelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Item[];
};

const CategorySelect: FC<CategorySelectProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <View style={styles.categoryContainer}>
      <RNPickerSelect
        value={value}
        placeholder={{ label: "Filter by category", color: "#46424289" }}
        onValueChange={onChange}
        items={options}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    height: 40,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CategorySelect;
