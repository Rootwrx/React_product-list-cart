import { FilterSection } from "./FilterSection";
import { CATEGORIES, DIETARIES } from "./assets/data";

export const SideBar = ({
  onFilterByCategory,
  onFilterByDietary,
  checkedDietaries,
  checkedCategories,
}) => (
  <aside className="w-fit bg-white p-5 rounded-xl shadow-sm border border-gray-200 space-y-8 h-fit">
    <FilterSection
      title="Category"
      options={CATEGORIES}
      checked={checkedCategories}
      onChange={onFilterByCategory}
    />
    <FilterSection
      title="Dietaries"
      options={DIETARIES}
      checked={checkedDietaries}
      onChange={onFilterByDietary}
    />
  </aside>
);
