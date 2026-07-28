import { useJobsStore } from '../../store/jobs.store';
import { formatTime } from '../../utils/lib';

export function JobList() {
  const items = useJobsStore((s) => s.jobs);
  const activeJobId = useJobsStore((s) => s.activeJobId);
  const selectJob = useJobsStore((s) => s.selectJob);

  return (
    <article>
      <header className="row">
        Список заданий
        <small>{items.length}</small>
      </header>

      {items.length === 0 ? (
        <span>Нет заданий на проверку</span>
      ) : (
        <ul className="job-list">
          {items
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .map((job) => (
              <li key={job.id}>
                <button
                  aria-current={job.id === activeJobId}
                  onClick={() => selectJob(job.id)}
                >
                  <div className="row">
                    <div className="column">
                      <span className="row">
                        <code>{job.id.slice(0, 6)}</code>
                        <span className={`badge badge--${job.status}`}>
                          {job.status}
                        </span>
                      </span>

                      <span className="row">
                        <small>{formatTime(job.createdAt)}</small>
                        <small>
                          {job.successCount + job.errorCount} / {job.totalUrls}{' '}
                          · {job.successCount} ok · {job.errorCount} err
                        </small>
                      </span>
                    </div>

                    {(job.status === 'pending' ||
                      job.status === 'in_progress') && (
                      <img
                        style={{ borderRadius: '3px' }}
                        height={25}
                        width={25}
                        src="/fast_loading.gif"
                      />
                    )}
                  </div>
                </button>
              </li>
            ))}
        </ul>
      )}
    </article>
  );
}
