import { useParams } from "react-router";

const CategoryDetail = () => {
  const { id } = useParams();

  return id;
};

export default CategoryDetail;
