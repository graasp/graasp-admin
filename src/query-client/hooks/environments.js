import { useQuery } from 'react-query';
import { Map } from 'immutable';
import * as Api from '../api';
import { CURRENT_MEMBER_KEY } from '../config/keys';

export default (queryClient, queryConfig) => {
  const { retry, cacheTime, staleTime } = queryConfig;
  const defaultOptions = {
    retry,
    cacheTime,
    staleTime,
  };
  const useCurrent = () =>
    useQuery({
      queryKey: CURRENT_MEMBER_KEY,
      queryFn: () =>
        Api.getCurrentMember(queryConfig).then((data) => Map(data)),
      ...defaultOptions,
    });

  const useGetJsonFromApi = (url) => {
    return useQuery(['deployedVersions'], async () => {
      // const url = `${buildGetDeployedVersionsRoute(environment)}`;
      const response = await fetch(url, {
        headers: {
          Authorization: 'token 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',
        },
      });
      const resource = await response.json();
      const gitUrl = await fetch(resource.git_url);
      const file = await gitUrl.json();
      const fileBlob = file.content;
      const fileContents = Buffer.from(fileBlob, 'base64').toString();
      const versions = JSON.parse(fileContents);
      return versions.include;
    });
  };

  const useGetDataFromApi = (url) => {
    return useQuery(['staging'], async () => {
      const response = await fetch(url);
      const resource = await response.json();
      // const gitUrl = await fetch(resource.git_url);
      // const file = await gitUrl.json();
      // const fileBlob = file.content;
      // const fileContents = Buffer.from(fileBlob, 'base64').toString();
      // const versions = JSON.parse(fileContents);
      // return versions.include;
      return resource;
    });
  };

  return {
    useCurrent,
    useGetJsonFromApi,
    useGetDataFromApi,
  };
};
