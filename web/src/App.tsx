import { useEffect } from 'react';
import { UrlForm } from './components/UrlForm/UrlForm';
import { JobList } from './components/JobList/JobList';
import { JobDetails } from './components/JobDetails/JobDetails';
import { useJobsStore } from './store/jobs.store';
import { useJobPolling } from './hooks/useJobPolling';

function App() {
  const activeJobId = useJobsStore((s) => s.activeJobId);
  const error = useJobsStore((s) => s.error);
  const refreshList = useJobsStore((s) => s.refreshList);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  useJobPolling(activeJobId);

  return (
    <>
      <header className="container">URL checker</header>
      <main className="container">
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
        <div className="grid">
          <section>
            <UrlForm />
            <JobList />
          </section>
          <section>
            <JobDetails />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
