import { useLocation, useNavigate } from "react-router-dom";

interface PageSortType {
  page: number;
  sort: string;
}

const useCustomRouter = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const pushQuery = (page: number, sort: string) => {
    const query = {} as PageSortType;
    if (page) query.page = page;
    if (sort) query.sort = sort;

    const newQuery = new URLSearchParams(query as any).toString();
    navigate(`${pathname}?${newQuery}`);
  };

  return { pathname, search, pushQuery };
};

export default useCustomRouter;
