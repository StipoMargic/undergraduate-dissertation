import { useContext } from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../../../Context/global";

const CategoryAdminSingle = () => {
  const { categories } = useContext(GlobalContext);
  const { id } = useParams();

  const category = categories.find((cat) => cat.id === id);
  console.log(category);

  return 1;
};

export default CategoryAdminSingle;
