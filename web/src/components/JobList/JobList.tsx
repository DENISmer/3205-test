import type { JobSummary } from '../../types/job.types';
import { formatTime } from '../../utils/lib';

interface JobListProps {
  items: JobSummary[] | null;
  activeJobId: string | null;
  onSelect: (id: string) => void;
}

export function JobList(props: JobListProps) {
  if (!props.items) {
    return (
      <article>
        <header>Список заданий</header>
        <span aria-busy="true">Загружаем</span>
      </article>
    );
  }

  return (
    <article>
      <header>
        Список заданий
        <small>{props.items.length}</small>
      </header>

      {props.items.length === 0 ? (
        <span>Нет заданий на проверку</span>
      ) : (
        <ul className="job-list">
          {props.items.map((job) => (
            <li key={job.id}>
              <button
                aria-current={job.id === props.activeJobId}
                onClick={() => props.onSelect(job.id)}
              >
                <span className="row">
                  <code>{job.id.slice(0, 6)}</code>
                  <span className={`badge badge--${job.status}`}>
                    {job.status}
                  </span>
                </span>
                <span className="row">
                  <small>{formatTime(job.createdAt)}</small>
                  <small>
                    {job.processed} / {job.totalUrls} · {job.successCount} ok ·{' '}
                    {job.errorCount} err
                  </small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
