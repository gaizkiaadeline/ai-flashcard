import { useState } from 'react';

export default function GenerateFlashcards() {
  const [inputText, setInputText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: inputText,
      });

      const data = await response.json();
      if (response.ok) {
        setFlashcards(data.flashcards);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Generate Flashcards</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={5}
          placeholder="Enter your text here..."
          style={{ width: '100%', padding: '10px' }}
          required
        />
        <button type="submit" disabled={loading} style={{ marginTop: '10px' }}>
          {loading ? 'Generating...' : 'Generate Flashcards'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {flashcards.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Generated Flashcards</h2>
          {flashcards.map((flashcard, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <p><strong>Question:</strong> {flashcard.front}</p>
              <p><strong>Answer:</strong> {flashcard.back}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
