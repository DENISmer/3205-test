import type { JobDetails } from '../../types/job-details.types';

export function JobDetails(props: JobDetails) {
  if (!props.urls) {
    return (
      <article>
        <header>Задание {props.id}</header>
        <span aria-busy="true">Загружаем</span>
      </article>
    );
  }

  return (
    <article>
      <header>Задание {props.id}</header>
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
          {props.urls &&
            props.urls.length &&
            props.urls.map((item) => (
              <tr>
                <th scope="row">{item.url}</th>
                <td>{item.status}</td>
                <td>{item.httpStatus}</td>
                <td>{item.error}</td>
                <td>{item.durationMs}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </article>
  );
}
