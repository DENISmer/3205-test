import { JobDetails } from './components/JobDetails/JobDetails';
import { JobList } from './components/JobList/JobList';
import { UrlForm } from './components/UrlForm/UrlForm';

function App() {
  return (
    <>
      <header className="container">URL checker</header>
      <main className="card">
        <div className="grid">
          <section className="">
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
