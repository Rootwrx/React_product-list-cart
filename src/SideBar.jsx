import { FilterSection } from "./FilterSection";
import { CATEGORIES, DIETARIES, FILTERS } from "./assets/data";

export const SideBar = ({ onFilter, checkedFilters }) => (
  <aside className="w-fit bg-white p-5 rounded-xl shadow-sm border border-gray-200 space-y-8 h-fit">
    <FilterSection
      title="Categories"
      options={CATEGORIES}
      checked={checkedFilters[FILTERS.CATEGORIES]}
      onChange={(v) => onFilter(FILTERS.CATEGORIES, v)}
    />
    <FilterSection
      title="Dietaries"
      options={DIETARIES}
      checked={checkedFilters[FILTERS.DIETARIES]}
      onChange={(v) => onFilter(FILTERS.DIETARIES, v)}
    />
  </aside>
);
