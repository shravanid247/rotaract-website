import React from 'react';
import { Hero } from '../components/Hero';
import { TrekTimeline } from '../components/TrekTimeline';
import { TrailConditions } from '../components/TrailConditions';
import { PackingChecklist } from '../components/PackingChecklist';
import { Gallery } from '../components/Gallery';
import { RegistrationForm } from '../components/RegistrationForm';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';

export const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <TrekTimeline />
      <TrailConditions />
      <Gallery />
      <PackingChecklist />
      <Testimonials />
      <FAQ />
      <RegistrationForm />
    </div>
  );
};