
import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-base text-sky-600 font-semibold tracking-wide uppercase">Quiénes Somos</p>
          <h1 className="mt-1 text-4xl font-extrabold text-slate-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Nuestra Misión es la Esperanza</h1>
          <p className="max-w-xl mt-5 mx-auto text-xl text-slate-500">
            Alma nació del sueño de un mundo donde cada persona en África tiene la oportunidad de alcanzar su máximo potencial.
          </p>
        </div>

        <div className="mt-20 prose prose-lg prose-sky mx-auto text-slate-600">
          <p>
            Somos una organización no gubernamental dedicada a implementar proyectos humanitarios sostenibles en las regiones más vulnerables de África. Creemos firmemente que el cambio real proviene de empoderar a las comunidades locales con las herramientas y el conocimiento necesarios para construir un futuro próspero y autosuficiente.
          </p>
          <p>
            Nuestros esfuerzos se centran en tres áreas fundamentales: <strong>salud y saneamiento</strong>, <strong>educación</strong> y <strong>desarrollo económico</strong>. Desde la construcción de pozos de agua potable hasta la creación de programas de microcréditos para mujeres emprendedoras, cada acción que tomamos está diseñada para tener un impacto duradero y medible.
          </p>
          <figure className="my-12">
            <img className="w-full rounded-lg shadow-lg" src="https://picsum.photos/seed/community/800/500" alt="Comunidad sonriendo" />
            <figcaption className="text-center mt-2 text-sm text-slate-500">Miembros de una comunidad beneficiada por nuestros programas.</figcaption>
          </figure>
          <h2>Nuestros Valores</h2>
          <ul>
            <li><strong>Transparencia:</strong> Cada donación se rastrea y se informa. Creemos en la total claridad con nuestros donantes y socios.</li>
            <li><strong>Sostenibilidad:</strong> No buscamos soluciones temporales. Nuestros proyectos están diseñados para ser mantenidos y gestionados por las propias comunidades a largo plazo.</li>
            <li><strong>Respeto:</strong> Trabajamos codo a codo con líderes y miembros de la comunidad, respetando su cultura, tradiciones y conocimientos.</li>
            <li><strong>Impacto:</strong> Nos enfocamos en resultados. Medimos nuestro éxito por las vidas que transformamos y el bienestar que generamos.</li>
          </ul>
          <p>
            Unirte a Alma es más que hacer una donación. Es ser parte de un movimiento global de compasión, acción y cambio. Juntos, podemos seguir llevando luz y esperanza a quienes más lo necesitan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
