import Building from './home/partials/building';
import ConversationForm from './home/partials/conversationForm';
import Experience from './home/partials/experience';
import Footer from './home/partials/footer';
import Frequently from './home/partials/frequently';
import Frontend from './home/partials/frontend';
import Hero from './home/partials/hero';
import Interface from './home/partials/interface';
import { Navbar } from './home/partials/navbar';
import Proven from './home/partials/proven';
import Trusted from './home/partials/trusted';

export default async function Home(props: {
  searchParams?: { showModal?: string };
}) {
  const searchParams = await props.searchParams;
  const showModal = searchParams?.showModal === 'success';

  return (
    <div className='relative min-h-screen bg-black'>
      <Navbar />
      <Hero showModal={showModal} />
      <Proven />
      <Experience />
      <Interface />
      <Building />
      <Frontend />
      <Trusted />
      <Frequently />
      {/* Overlay gradient untuk Frequently & Footer */}
      <div className='relative'>
        {/* Overlay gradient */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 z-0'
          style={{
            background:
              'linear-gradient(135deg, rgba(76,29,149,0.00) 35%, rgba(162,89,195,0.35) 100%, rgba(76,29,149,0.80) 100%)',
            width: '100%',
            height: '100%',
            minHeight: '600px',
          }}
        />
        <div className='relative z-10'>
          <ConversationForm />
          <Footer />
        </div>
      </div>
    </div>
  );
}
