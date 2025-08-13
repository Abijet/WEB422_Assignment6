import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [artworkIds, setArtworkIds] = useState([]);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    if (q) {
      setSearchHistory(prev => [...prev, q]);
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${q}`)
        .then(res => res.json())
        .then(data => setArtworkIds(data.objectIDs || []));
    }
  }, [q]);

  if (!artworkIds.length) return <p>No results found.</p>;

  return (
    <>
      <h1>Search Results for "{q}"</h1>
      {artworkIds.map(id => <ArtworkCardDetail key={id} objectID={id} />)}
    </>
  );
}
