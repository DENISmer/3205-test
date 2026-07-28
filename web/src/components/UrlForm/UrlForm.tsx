import { useState, type FormEvent } from 'react';
import { useJobsStore } from '../../store/jobs.store';

export function UrlForm() {
  const [text, setText] = useState('');
  const submitUrls = useJobsStore((s) => s.submitUrls);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const urls = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (urls.length === 0) return;

    submitUrls(urls);
    setText('');
  };

  return (
    <article>
      <header>Новая проверка</header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="urls">Список URL (каждый с новой строки)</label>
        <textarea
          id="urls"
          rows={7}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={'https://example.com\nhttps://another-site.com'}
        />
        <button type="submit">Запустить проверку</button>
      </form>
    </article>
  );
}
