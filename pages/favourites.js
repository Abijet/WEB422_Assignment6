import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';

export default function Favourites() {
  const [favourites] = useAtom(favouritesAtom);

  if (!favourites.length) return <p>No favourites yet.</p>;

  return (
    <>
      <h1>Favourites</h1>
      {favourites.map(id => <ArtworkCardDetail key={id} objectID={id} />)}
    </>
  );
}
