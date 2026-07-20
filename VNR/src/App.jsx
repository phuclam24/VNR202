import React from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { Hero } from './components/Hero.jsx';
import {
  PartSection1, PartSection2, PartSection3,
  PartSection4, PartSection5,
} from './components/Sections.jsx';

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Hero />
        <PartSection1 />
        <PartSection2 />
        <PartSection3 />
        <PartSection4 />
        <PartSection5 />
      </main>
    </div>
  );
}