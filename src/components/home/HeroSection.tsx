import { FC } from 'react';

export const HeroSection: FC = () => {
  return (
    <section className="text-center space-y-6 py-12 animate-fade-in">
      <div className="relative inline-block">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Assistant Coaching Sportif
        </h1>
        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 animate-[scale-in_0.5s_ease-out_forwards]"></div>
      </div>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
        Votre assistant personnel pour gérer votre activité de coach sportif professionnel
      </p>
    </section>
  );
};