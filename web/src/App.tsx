import { useEffect } from 'react';
import { UrlForm } from './components/UrlForm/UrlForm';
import { JobList } from './components/JobList/JobList';
import { JobDetails } from './components/JobDetails/JobDetails';
import { useJobsStore } from './store/jobs.store';
import { useJobPolling } from './hooks/useJobPolling';
import { useJobListPolling } from './hooks/useJobListPolling';

function App() {
  const activeJobId = useJobsStore((s) => s.activeJobId);
  const error = useJobsStore((s) => s.error);
  const refreshList = useJobsStore((s) => s.refreshList);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  useJobPolling(activeJobId);
  useJobListPolling();

  return (
    <>
      <header className="container">
        <h1 style={{ paddingTop: '10px' }}>URL checker</h1>
      </header>
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
