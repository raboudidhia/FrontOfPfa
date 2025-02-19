

const CategoryDropdown = () => {
  const categories = ['Nutrition or Diet', 'Osteoarthritis', 'Behavior', 'Kidney Failure', 'Ophthalmology', 'Overweight', 'Digestive Issues'];

  return (
    <select className="  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700">
      <option value="">Select a category</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryDropdown;