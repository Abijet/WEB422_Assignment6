import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function ArtworkCardDetail({ objectID }) {
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [artwork, setArtwork] = useState(null);

  const isFavourite = favourites.includes(objectID);

  useEffect(() => {
    async function fetchArtwork() {
      const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
      const data = await res.json();
      setArtwork(data);
    }
    if (objectID) fetchArtwork();
  }, [objectID]);

  function toggleFavourite() {
    if (isFavourite) {
      setFavourites(favourites.filter(id => id !== objectID));
    } else {
      setFavourites([...favourites, objectID]);
    }
  }

  if (!artwork) return null;

  return (
    <Card>
      <Card.Img variant="top" src={artwork.primaryImage} />
      <Card.Body>
        <Card.Title>{artwork.title}</Card.Title>
        <Card.Text>{artwork.artistDisplayName || 'Unknown Artist'}</Card.Text>
        <Button variant={isFavourite ? 'danger' : 'outline-primary'} onClick={toggleFavourite}>
          {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
        </Button>
      </Card.Body>
    </Card>
  );
}
