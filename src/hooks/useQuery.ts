import {useLocation} from 'react-router-dom';
import qs from 'query-string';


export const useQuery = <TQuery extends Record<string, string>,>(): TQuery => {
    const {search} = useLocation();

    return qs.parse(search) as TQuery;
};
