import DataLoader from 'dataloader';

type DataLoaderType = DataLoader<string, unknown | undefined>;

export interface LoaderInterface {
  user: DataLoaderType;
  post: DataLoaderType;
  profile: DataLoaderType;
  memberType: DataLoaderType;
}