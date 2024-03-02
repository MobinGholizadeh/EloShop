export const SearchBox = ({ onChangeText }) => {
  return (
    <input
      className="mb-2 form-control mr-2"
      onChange={onChangeText}
      placeholder="Search here..."
    />
  );
};
