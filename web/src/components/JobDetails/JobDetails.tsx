import { useJobsStore } from '../../store/jobs.store';

export function JobDetails() {
  const job = useJobsStore((s) => s.activeJob);
  const cancelActiveJob = useJobsStore((s) => s.cancelActiveJob);

  if (!job) {
    console.warn(123);
    return (
      <article>
        <p>Выбери задание из списка слева</p>
      </article>
    );
  }

  return (
    <article>
      <header className="row">
        <span>
          Задание <code>{job.id.slice(0, 6)}</code>
        </span>
        <span className={`badge badge--${job.status}`}>{job.status}</span>
      </header>
      <div className="overflow-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">URL</th>
              <th scope="col">Статус</th>
              <th scope="col">HTTP</th>
              <th scope="col">Ошибка</th>
              <th scope="col">Время</th>
            </tr>
          </thead>
          <tbody>
            {job.urls.map((item) => (
              <tr key={item.url}>
                <th scope="row">{item.url}</th>
                <td>{item.status}</td>
                <td>{item.httpStatus ?? '—'}</td>
                <td>{item.error ?? '—'}</td>
                <td>
                  {item.durationMs
                    ? `${(item.durationMs / 1000).toFixed(1)} с`
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={cancelActiveJob}>Отменить задание</button>
    </article>
  );
}
