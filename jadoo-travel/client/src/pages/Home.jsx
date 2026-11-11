import Hero from '../components/Hero';
import Services from '../components/Services';
import TopDestinations from '../components/TopDestinations';
import BookingSteps from '../components/BookingSteps';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <TopDestinations />
      <BookingSteps />
      <Testimonials />
      <Partners />
      <Newsletter />
    </main>
  );
}
