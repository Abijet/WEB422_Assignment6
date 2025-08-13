import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function History() {
  const [searchHistory] = useAtom(searchHistoryAtom);

  if (!searchHistory.length) return <p>No search history.</p>;

  return (
    <>
      <h1>Search History</h1>
      <ul>
        {searchHistory.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>
    </>
  );
}
